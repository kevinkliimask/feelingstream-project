from dataclasses import dataclass
from sqlalchemy import UUID, ForeignKey
import uuid


from extensions import db


@dataclass
class Interaction(db.Model):
    __tablename__ = "interactions"

    id = db.Column(db.Integer, primary_key=True)
    uuid: str = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)
    customer_uuid = db.Column(UUID(as_uuid=True), ForeignKey("customers.uuid"), nullable=False)
    title: str = db.Column(db.String(), nullable=False)
    description: str = db.Column(db.String())

    def __repr__(self):
        return f'<Interaction {self.id}>'
