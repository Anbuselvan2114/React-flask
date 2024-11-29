from flask import Blueprint, request, jsonify
from microservices.data_service.services.data_service import dataService
from microservices.data_service.models.datamodel import datamodel

data_controller = Blueprint('data_controller', __name__)
data_service = dataService()

@data_controller.route('/data', methods=['POST'])
def add_data():
    data = request.get_json()
    data = datamodel(data['data_id'], data['name'], data['email'])
    data_service.add_data(data)
    return jsonify({"message": "data added successfully"}), 201

@data_controller.route('/data/<data_id>', methods=['GET'])
def get_data(data_id):
    data = data_service.get_data(data_id)
    if data:
        return jsonify({"data_id": data.data_id, "name": data.name, "email": data.email})
    return jsonify({"message": "data not found"}), 404
