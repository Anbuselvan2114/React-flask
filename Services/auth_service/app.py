# app/app.py
from flask import Flask
from controllers.auth_controller import auth_controller
from auth_service.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(auth_controller)


if __name__ == '__main__':
    app.run(port=5001)
