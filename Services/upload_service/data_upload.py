from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from config import Config
from flask_cors import CORS
import jwt
from functools import wraps

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)  # Enable CORS
JWT_SECRET_KEY=app.config['JWT_SECRET_KEY']


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            decoded_token = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
            request.username = decoded_token['username']  # Attach the username to the request object
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(*args, **kwargs)

    return decorated_function

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/upload', methods=['POST'])
@token_required
def upload_file():
    # Check if 'file' is part of the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # If no file was selected
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    text_value = request.form.get('textValue')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        print(f"Received text value: {text_value}")
        print(f"File saved as: {filename}")

        return jsonify({"message": "File uploaded and text submitted successfully", "filename": filename,
                        "textValue": text_value}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 415


if __name__ == '__main__':
    # Ensure the upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(port=5003)
