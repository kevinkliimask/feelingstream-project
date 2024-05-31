from dotenv import load_dotenv
from flask import Flask


from extensions import db, jwt, migrate
from routers.auth import auth_routes
from routers.customer import customer_routes
from routers.interaction import interaction_routes


def createApp():
  load_dotenv()

  app = Flask(__name__)
  app.config.from_pyfile("config.py")

  db.init_app(app)
  migrate.init_app(app, db)
  jwt.init_app(app)

  app.register_blueprint(auth_routes)
  app.register_blueprint(customer_routes)
  app.register_blueprint(interaction_routes)

  return app