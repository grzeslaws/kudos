from kudos_api import db, generate_uuid
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
    uuid = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(80), nullable=True)
    display_name = db.Column(db.String(80), nullable=True)
    image = db.Column(db.String(300), nullable=True)
    email = db.Column(db.String(80), nullable=True)
    kudos = db.relationship("Kudos", secondary=kudos_related,
                            backref=db.backref("users", lazy="subquery"))

    @classmethod
    def get_top_pick(cls):
        return cls.query.limit(3).all()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def search(cls, arg):
        return cls.query.filter(db.or_(cls.name.contains(arg)), cls.display_name.contains(arg),
                                cls.email.contains(arg)).all()


class Kudos(db.Model):
    per_page = 10

    id = db.Column(db.Integer, primary_key=True)
    kuid = db.Column(db.String(100), unique=True, default=generate_uuid)
    description = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.Integer, nullable=False)
    date_string = db.Column(db.String(50))

    def order_by_timestamp(cls, page):
        return cls.query.order_by(desc(cls.timestamp)).paginate(page=page, per_page=cls.per_page)
