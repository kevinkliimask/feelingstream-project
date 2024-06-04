from flask import Blueprint, Response, jsonify, request
from marshmallow import Schema, ValidationError, fields


from models.interaction import Interaction
from extensions import db
from models.customer import Customer


customer_routes = Blueprint("customer", __name__)


class CreateCustomerSchema(Schema):
    name = fields.String(required=True)


@customer_routes.post("/v1/customers")
def create_customer():
    request_data = request.json
    schema = CreateCustomerSchema()
    try:
        data = schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    customer = Customer(name=data["name"])

    db.session.add(customer)
    db.session.commit()

    return Response(status=201)

@customer_routes.get("/api/v1/customers")
def get_customers():
    customers = Customer.query \
        .filter(Customer.deleted_at.is_(None)).all()
    
    result = []
    for customer in customers:
        result.append({**customer.to_dict(exclude=["id"]), "interactions": \
                       [interaction.to_dict(exclude=["id", "deleted_at", "customer_uuid"]) \
                        for interaction in customer.interactions if interaction.deleted_at is None]})

    return jsonify({"data": result})

@customer_routes.get("/api/v1/customers/<uuid>")
def get_customer(uuid: str):
    customer = Customer.query.filter_by(uuid=uuid).first()
    if not customer:
        return Response("Customer not found", status=404)
    
    return jsonify({ "data": {**customer.to_dict(exclude=["id"]), "interactions": \
                              [interaction.to_dict(exclude=["id", "deleted_at", "customer_uuid"]) \
                               for interaction in customer.interactions]}})
