from flask import Blueprint, Response, jsonify, request
from marshmallow import Schema, ValidationError, fields


from extensions import db
from models.customer import Customer
from models.interaction import Interaction


interaction_routes = Blueprint("interaction", __name__)


class CreateInteractionSchema(Schema):
    customer_uuid = fields.UUID(required=True)
    title = fields.String(required=True)
    description = fields.String(required=True)


@interaction_routes.post("/v1/interactions")
def create_interaction():
    request_data = request.json
    schema = CreateInteractionSchema()
    
    try:
        data = schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    interaction = Interaction(customer_uuid=data["customer_uuid"], title=data["title"], description=data["description"])

    db.session.add(interaction)
    db.session.commit()

    return Response(status=201)

@interaction_routes.get("/v1/interactions")
def get_interactions():
    interactions = Interaction.query.filter(Interaction.deleted_at.is_(None)).all()
    
    result = []
    for interaction in interactions:
        result.append({**interaction.to_dict(), "customer": interaction.customer.to_dict(exclude=["id"])})

    return jsonify({"data": result})