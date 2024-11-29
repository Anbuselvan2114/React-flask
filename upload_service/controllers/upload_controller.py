from flask import Flask, request, jsonify,Blueprint
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import jwt
from functools import wraps
from upload_service.config import Config
from upload_service.models.upload_model import uploadmodel

upload_controller = Blueprint('upload_controller', __name__)
CORS(upload_controller)
JWT_SECRET_KEY=Config.JWT_SECRET_KEY

if not os.path.exists(Config.UPLOAD_FOLDER):
    os.makedirs(Config.UPLOAD_FOLDER)

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
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

@upload_controller.route('/upload', methods=['POST'])
@token_required
def upload_file():
    contenttype = None

    uploadmodel.DocumentType = request.form.get('DocumentType')

    if 'Authorization' in request.headers:
        contenttype = request.headers['Content-Type']

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(Config.UPLOAD_FOLDER, filename))

        print(f"Received text value: {uploadmodel.DocumentType}")
        print(f"File saved as: {filename}")

        return jsonify({"message": "File uploaded and text submitted successfully "+uploadmodel.DocumentType, "filename": filename,
                        "textValue": uploadmodel.DocumentType}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 415

