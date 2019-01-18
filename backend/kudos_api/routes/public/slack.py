from kudos_api import app, db
from flask import request, jsonify
import os
import pprint
from slackclient import SlackClient
from kudos_api.models import User

slack_token = os.environ["SLACK_TOKEN"]
sc = SlackClient(slack_token)

# sc.api_call(
#     "chat.postMessage",
#     channel="test",
#     text="Hello from Kudos! :tada:"
# )


@app.route("/init_slack_users", methods=["GET"])
def init_slack_users():

    db.drop_all()
    db.create_all()

    for u in sc.api_call("users.list")["members"]:

        try:
            email = u["profile"]["email"]
            user = User(email=email)
            user.name = u["name"]

            try:
                user.uuid = u["uuid"]
            except KeyError as e:
                print(e)

            try:
                user.image = u["profile"]["image_72"]
            except KeyError as e:
                print(e)

            try:
                user.display_name = u["profile"]["real_name_normalized"]
            except KeyError as e:
                print(e)

            db.session.add(user)
        except KeyError as e:
            print(e)

    db.session.commit()
    return jsonify({"message": "User has been initilized!"})


@app.route("/listening", methods=["POST", "GET"])
def listening():
    if request.method == "POST":
        pprint.pprint(request.json)
        return jsonify({"challenge": "dddddddd"}), 201
        # return jsonify({"challenge": request.json["challenge"]}), 201
