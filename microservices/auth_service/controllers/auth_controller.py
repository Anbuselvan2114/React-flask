
from flask import request, jsonify,Blueprint
from flask_cors import CORS
import jwt
import datetime
from microservices.common.config import Config
from microservices.auth_service.services.auth_service import authService


auth_controller = Blueprint('auth_controller', __name__)
CORS(auth_controller)

@auth_controller.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    objauthService = authService()

    output=objauthService.get_auth(username)

    if output == password:
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

        # Create JWT token
        token = jwt.encode({
            'username': username,
            'password': password,
            'exp': expiration_time
        }, Config.JWT_SECRET_KEY, algorithm='HS256')

        return jsonify({'token': token}), 200  # Return the token to the client
    return jsonify(message="Invalid credentials"), 401

