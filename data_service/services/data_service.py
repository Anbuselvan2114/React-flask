from base_service import ReadableService, WritableService
from models.datamodel import data

class dataService(ReadableService, WritableService):
    def __init__(self):
        self.data = {}

    def get_data(self, data_id: str) -> dict:
        return self.data.get(data_id)

    def list_data(self) -> list:
        return [{"data_id": uid, **details} for uid, details in self.data.items()]

    # Implementation of UserWritableService
    def add_data(self, data) -> None:
        self.data[data_id] = {"name": name, "email": email}

    def delete_data(self, data) -> None:
        if data.data_id in self.data:
            del self.data[data_id]
