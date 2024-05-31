from extensions import db


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __repr__(self):
        return f'<Customer {self.name}>'
