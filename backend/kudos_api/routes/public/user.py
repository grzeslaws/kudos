from kudos_api import app
from flask import jsonify
from kudos_api.models import User
from kudos_api.serializers import user_item


@app.route("/api/users/", defaults={"arg": ""})
@app.route("/api/users/<arg>")
def get_users(arg):

    if arg is not "":
        users = User.search(arg)
        return jsonify({"users": [user_item(u) for u in users]}), 200
    else:
        return jsonify({"users": []}), 200


@app.route("/api/top_picks", methods=["GET"])
def top_picks():

    top_picks = User.get_top_pick()
    return jsonify({"top_picks": [user_item(u) for u in top_picks]}), 200
