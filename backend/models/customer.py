from dataclasses import dataclass
from sqlalchemy import UUID, DateTime, inspect
import uuid


from extensions import db


@dataclass
class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    uuid: str = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)
    name: str = db.Column(db.String(), nullable=False)
    created_at: DateTime = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

    interactions = db.relationship("Interaction", backref="customer")

    def to_dict(self, exclude=None):
        if exclude is None:
            exclude = []
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs if c.key not in exclude}

    def __repr__(self):
        return f'<Customer {self.name}>'
