from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    response = requests.post('http://localhost:5001/login', json={'username': username, 'password': password})
    return response.json()

if __name__ == '__main__':
    app.run(port=5000)
