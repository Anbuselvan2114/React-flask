# app/app.py
from flask import Flask
from controllers.upload_controller import upload_controller
from microservices.upload_service.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(upload_controller)


if __name__ == '__main__':
        app.run(port=5003)
