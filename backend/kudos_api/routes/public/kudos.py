from kudos_api import app
from flask import request, jsonify
from kudos_api.models import Kudos
from kudos_api.serializers import kudos_item
from kudos_api.services import add_kudos
from sqlalchemy import desc


@app.route("/api/kudos/<int:page>", methods=["POST", "GET"])
def kudos(page):
    if request.method == "GET":
        kudos = Kudos.query.order_by(desc(Kudos.timestamp)).limit(10 * page).all()

        return jsonify({
            "kudos": [kudos_item(k) for k in kudos]
        }), 200

    if request.method == "POST":

        add_kudos(request.json["description"], request.json["uuid"])
        return jsonify({"message": "Kudos has been added!"}), 201
