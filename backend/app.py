from flask import Flask
from flask_migrate import Migrate

from database import db
from models.user import User
from models.customer import Customer
from models.interaction import Interaction


app = Flask(__name__)
app.config.from_pyfile("config.py")
db.init_app(app)
migrate = Migrate(app, db)


@app.get("/")
def home():
  return "Hello world"
