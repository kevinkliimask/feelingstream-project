from sqlalchemy import ForeignKey
from extensions import db


class Interaction(db.Model):
    __tablename__ = "interactions"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, ForeignKey("customers.id"), nullable=False)
    title = db.Column(db.String())
    description = db.Column(db.String())

    customer = db.relationship("Customer", backref="interactions", lazy="dynamic")

    def __repr__(self):
        return f'<Interaction {self.id}>'
