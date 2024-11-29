from flask import Flask
from user_routes import user_blueprint  # Import the blueprint

app = Flask(__name__)
app.register_blueprint(user_blueprint, url_prefix='/data')  # Register with a URL prefix

if __name__ == "__main__":
    app.run(debug=True)
