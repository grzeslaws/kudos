from kudos_api import app, db
from flask import request, jsonify
from kudos_api.models import Kudos, User
from kudos_api.serializers import kudos_item
from kudos_api.services import add_kudos
from sqlalchemy import desc
from kudos_api.routes import token_required


@app.route("/api/kudos/<int:page>", methods=["POST", "GET"])
@token_required
def kudos(current_user, page):
    if request.method == "GET":
        kudos = Kudos.query.order_by(desc(Kudos.timestamp)).limit(10 * page).all()

        return jsonify({
            "kudos": [kudos_item(k) for k in kudos]
        }), 200

    if request.method == "POST":
        add_kudos(request.json["description"], request.json["uuid"], current_user)
        return jsonify({"message": "Kudos has been added!"}), 201


@app.route("/api/remove_kudos/<kuid>")
@token_required
def remove_kudos(current_user, kuid):
    if request.method == "GET":
        kudos = Kudos.query.filter_by(kuid=kuid).first()
        db.session.delete(kudos)
        db.session.commit()

        return jsonify({"message": "Kudos has been removed!"})


@app.route("/api/vote_for_kudos", methods=["POST"])
@token_required
def vote_for_kudos(current_user):
    if request.method == "POST":
        user = User.query.filter_by(uuid=request.json["uuid"]).first()
        kudos = Kudos.query.filter_by(kuid=request.json["kuid"]).first()
        voters_uuid = [ks.uuid for ks in kudos.voters]
        if request.json["uuid"] in voters_uuid:
            kudos.voters.remove(user)
        else:
            kudos.voters.append(user)

        db.session.add(kudos)
        db.session.commit()

        return jsonify({
            "messgae": "Kudos has been updated!"
        }), 200
