from dataclasses import dataclass
from sqlalchemy import UUID
import uuid
from sqlalchemy.orm import Mapped


from extensions import db
from models.interaction import Interaction


@dataclass
class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    uuid: str = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)
    name: str = db.Column(db.String(), nullable=False)

    interactions = db.relationship("Interaction", backref="customer")

    def __repr__(self):
        return f'<Customer {self.name}>'
