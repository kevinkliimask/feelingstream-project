from dataclasses import dataclass
from sqlalchemy import UUID, inspect
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

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return f'<Customer {self.name}>'
