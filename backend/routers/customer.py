from flask import Blueprint, Response, jsonify, request
from marshmallow import Schema, ValidationError, fields


from database import db
from models.customer import Customer


customer_routes = Blueprint("customer", __name__)


class CreateCustomerSchema(Schema):
    name = fields.String(required=True)


@customer_routes.post("/v1/customer")
def create_customer():
    request_data = request.json
    schema = CreateCustomerSchema()
    
    try:
        result = schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    customer = Customer(name=result["name"])

    db_session = db.session
    db_session.add(customer)
    db_session.commit()

    return Response(status=201)
