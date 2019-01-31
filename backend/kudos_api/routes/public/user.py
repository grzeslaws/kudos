from kudos_api import app
from flask import jsonify
from kudos_api.models import User
from kudos_api.serializers import user_item
from kudos_api.routes import token_required


@app.route("/api/all_users", methods=["GET"])
@token_required
def all_users(current_user):
    users = User.get_all()
    return jsonify({"users": [user_item(u) for u in users]}), 200


@app.route("/api/top_picks", methods=["GET"])
def top_picks():

    top_picks = User.get_top_pick()
    return jsonify({"top_picks": [user_item(u) for u in top_picks]}), 200
