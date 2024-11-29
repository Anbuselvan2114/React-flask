

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask import Flask, request, jsonify
import jwt
import datetime
from config import Config

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
JWT_SECRET_KEY=app.config['JWT_SECRET_KEY']
# Dummy user data
users = {"admin": "password123"}


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Authenticate user
    if username in users and users[username] == password:
        #expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=1)

        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

        # Create JWT token
        token = jwt.encode({
            'username': username,
            'exp': expiration_time
        }, JWT_SECRET_KEY, algorithm='HS256')

        return jsonify({'token': token}), 200  # Return the token to the client
    return jsonify(message="Invalid credentials"), 401



if __name__ == '__main__':
    app.run(port=5001)

