from abc import ABC, abstractmethod
from typing import Optional

class ReadableService(ABC):
    @abstractmethod
    def get_data(self, data_id: str) -> Optional[dict]:
        pass

    @abstractmethod
    def list_data(self) -> list:
        pass

class WritableService(ABC):
    @abstractmethod
    def add_data(self, data_id: str, name: str, email: str) -> None:
        pass

    @abstractmethod
    def delete_data(self, data_id: str) -> None:
        pass
