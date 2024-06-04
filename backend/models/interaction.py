from dataclasses import dataclass
from sqlalchemy import UUID, DateTime, ForeignKey, inspect
import uuid


from extensions import db


@dataclass
class Interaction(db.Model):
    __tablename__ = "interactions"

    id = db.Column(db.Integer, primary_key=True)
    uuid: str = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)
    customer_uuid: UUID = db.Column(UUID(as_uuid=True), ForeignKey("customers.uuid"), nullable=False)
    title: str = db.Column(db.String(), nullable=False)
    description: str = db.Column(db.String())
    created_at: DateTime = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
    deleted_at: DateTime = db.Column(db.DateTime)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return f'<Interaction {self.id}>'
