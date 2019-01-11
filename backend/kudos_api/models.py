from kudos_api import db, generate_uuid
import time
from datetime import timezone, datetime

from sqlalchemy import desc

kudos_related = db.Table("kudos_related",
                         db.Column("user_id", db.Integer, db.ForeignKey(
                             "user.id"), primary_key=True),
                         db.Column("kudos_id", db.Integer, db.ForeignKey(
                             "kudos.id"), primary_key=True)
                         )


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(
        db.String(100), default=generate_uuid)
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    nick = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(80), nullable=True)
    kudos = db.relationship("Kudos", secondary=kudos_related,
                            backref=db.backref("users", lazy="dynamic"))


class Kudos(db.Model):
    per_page = 10

    id = db.Column(db.Integer, primary_key=True)
    kuid = db.Column(db.String(100), unique=True, default=generate_uuid)
    description = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.Integer, nullable=False)

    @classmethod
    def order_by_timestamp(self, page):
        return self.query.order_by(desc(self.timestamp)).paginate(page=page, per_page=self.per_page)
