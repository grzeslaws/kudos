from kudos_api import app, db
from flask import request, jsonify
from kudos_api.models import Kudos, User
from kudos_api.serializers import kudos_item
from datetime import timezone, datetime
from sqlalchemy import desc


@app.route("/api/kudos/<int:page>", methods=["POST", "GET"])
def add_kudos(page):
    if request.method == "GET":
        kudos = Kudos.query.order_by(desc(Kudos.timestamp)).limit(10 * page).all()

        return jsonify({
            "kudos": [kudos_item(k) for k in kudos]
        }), 200

    if request.method == "POST":
        kudos = Kudos(description=request.json["description"], timestamp=int(datetime.now(
            tz=timezone.utc).timestamp() * 1000), date_string=datetime.now().strftime("%Y-%m-%d"))

        for uuid in request.json["uuid"]:
            user = User.query.filter_by(uuid=uuid).first()
            kudos.users.append(user)

        db.session.add(kudos)
        db.session.commit()

        return jsonify({"message": "Kudos has been added!"}), 201
