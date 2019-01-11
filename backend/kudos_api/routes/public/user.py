from kudos_api import app
from flask import jsonify
from kudos_api.models import User
from kudos_api.serializers import user_item, init_users


@app.route("/api/users", methods=["GET"])
def get_users():

    # init_users()

    users = User.query.all()
    return jsonify({"users": [user_item(u) for u in users]}), 200
