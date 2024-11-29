import os

class Config:
    JWT_SECRET_KEY = '4e3d5c3b2a86c3d94f5e3d7ac4d3b5a3c9d7f8e9a6b4c2d6a7f8e3d9c4a3b7f9'
    UPLOAD_FOLDER = 'uploads/'
    ALLOWED_EXTENSIONS = {'xls', 'xlsx'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB file size limit
