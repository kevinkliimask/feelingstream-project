from database import db


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    interactions = db.relationship("Interaction", back_populates="customer", lazy="dynamic")

    def __repr__(self):
        return f'<Customer {self.name}>'
