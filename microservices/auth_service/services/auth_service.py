
class authService():
    def __init__(self):
        self.users = {"admin": "password123"}

    def get_auth(self, Username: str) -> dict:
        return self.users.get(Username)

