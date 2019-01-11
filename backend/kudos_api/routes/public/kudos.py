from kudos_api import app, db
from flask import request, jsonify
from kudos_api.models import Kudos, User
from kudos_api.serializers import kudos_item
from datetime import timezone, datetime
# import time


@app.route("/api/kudos/<int:page>", methods=["POST", "GET"])
def add_kudos(page):
    if request.method == "GET":
        kudos = Kudos.order_by_timestamp(page)

        return jsonify({
            "kudos": [kudos_item(k) for k in kudos.items],
            "has_prev": kudos.has_prev,
            "next_num": kudos.next_num,
            "prev_num": kudos.prev_num,
            "pages": kudos.pages
        }), 200

    if request.method == "POST":
        # kudos = Kudos(description=request.json["description"], timestamp=1541856791 * 1000)
        kudos = Kudos(description=request.json["description"], timestamp=int(
            datetime.now(tz=timezone.utc).timestamp() * 1000))

        for uuid in request.json["uuid"]:
            user = User.query.filter_by(uuid=uuid).first()
            kudos.users.append(user)

        db.session.add(kudos)
        db.session.commit()

        return jsonify({"message": "Kudos has been added!"}), 201


# int(datetime.now(tz=timezone.utc).timestamp() * 1000)
