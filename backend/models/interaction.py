from sqlalchemy import ForeignKey
from database import db


class Interaction(db.Model):
    __tablename__ = 'interactions'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.mapped_column(ForeignKey("customers.id"))
    title = db.Column(db.String())
    description = db.Column(db.String())

    customer = db.relationship("Customer", back_populates="interaction")

    def __repr__(self):
        return f'<Interaction {self.id}>'
