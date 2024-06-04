from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from marshmallow import Schema, ValidationError, fields


from models.user import User


auth_routes = Blueprint("auth", __name__)


class AuthSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)


@auth_routes.post("/api/v1/auth")
def auth():
    request_data = request.json
    schema = AuthSchema()
    
    try:
        data = schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    user = User.query.filter_by(username=data["username"]).first()

    # if user and bcrypt.check_password_hash(user.password, password):
    if user and user.password == data["password"]:
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401
