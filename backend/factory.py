from dotenv import load_dotenv
from flask import Flask


from routers.customer import customer_routes
from routers.auth import auth_routes
from extensions import db, jwt, migrate


def createApp():
  load_dotenv()

  app = Flask(__name__)
  app.config.from_pyfile("config.py")

  db.init_app(app)
  migrate.init_app(app, db)
  jwt.init_app(app)

  print()

  app.register_blueprint(customer_routes)
  app.register_blueprint(auth_routes)

  return app