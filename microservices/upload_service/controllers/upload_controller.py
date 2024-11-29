from flask import request, jsonify,Blueprint
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from microservices.upload_service.models.upload_model import uploadmodel
from microservices.common.config import Config
from microservices.common.decorators import token_required
from microservices.common.functions import allowed_file

upload_controller = Blueprint('upload_controller', __name__)
CORS(upload_controller)


@upload_controller.route('/upload', methods=['POST'])
@token_required
def upload_file():
    contenttype = None

    uploadmodel.DocumentType = request.form.get('DocumentType')

    if 'Content-Type' in request.headers:
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

