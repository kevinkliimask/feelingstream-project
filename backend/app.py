from flask import Flask
from flask_migrate import Migrate

from database import db
from routers.customer import customer_routes


app = Flask(__name__)
app.register_blueprint(customer_routes)

app.config.from_pyfile("config.py")
db.init_app(app)
migrate = Migrate(app, db)


@app.get("/")
def home():
  return "Hello world"
