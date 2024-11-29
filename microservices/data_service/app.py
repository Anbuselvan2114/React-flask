# app/app.py
from flask import Flask
from controllers.data_controller import data_controller
from microservices.upload_service.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(data_controller)


if __name__ == '__main__':
        app.run(port=5002)
