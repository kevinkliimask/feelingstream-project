import os

SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
FRONTEND_URL = os.environ["FRONTEND_URL"]
