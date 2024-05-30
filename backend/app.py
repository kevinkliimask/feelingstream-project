from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_pyfile("config.py")
db = SQLAlchemy(app)

@app.get("/")
def home():
  return "Hello world"
