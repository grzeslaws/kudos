from kudos_api import app, sc
from flask import request, jsonify
from kudos_api.models import User
from kudos_api.services import add_kudos
import re


@app.route("/listening", methods=["POST", "GET"])
def listening():
    if request.method == "POST":
        event = request.json.get("event")
        text = event.get("text")
        pattern_user = re.compile("<@[A-Z, 0-9]{9}>")
        users_matches = re.findall(pattern_user, text)
        users_matches = [u[2: -1] for u in users_matches]
        users = User.query.all()
        if any(u.uuid in users_matches for u in users):
            description_kudos = ""
            for um in users_matches:
                user = User.query.filter_by(uuid=um).first()
                if user.name:
                    description_kudos += '<span class="draftJsMentionPlugin__mention__29BEd">@{}</span>'.format(
                        user.name)
            description_kudos += text.split("> ")[-1]
            current_user = User.query.filter_by(uuid=event.get("user")).first()
            if current_user.uuid not in users_matches:
                add_kudos(description_kudos, users_matches, current_user)
                sc.api_call(
                    "chat.postMessage",
                    channel=event.get("channel"),
                    text="Your kudos has been added! :thumbsup:"
                )
            else:
                sc.api_call(
                    "chat.postMessage",
                    channel=event.get("channel"),
                    text="You can't add kudos to yourself! :grimacing:"
                )

        return jsonify({"message": "Kudos has been added!"}), 201
        # return jsonify({"challenge": request.json["challenge"]}), 201
