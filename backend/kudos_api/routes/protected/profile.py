from kudos_api import app
from flask import jsonify
from kudos_api.serializers import user_item
from kudos_api.routes import token_required


@app.route("/api/profile", methods=["GET"])
@token_required
def profile(current_user):
    print("before")
    print("after")

    return jsonify({"profile": user_item(current_user)}), 200
