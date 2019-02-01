from kudos_api import app, db
from flask import request, jsonify
import os
from slackclient import SlackClient
from kudos_api.models import User
from kudos_api.services import add_kudos
import re

client_id = os.environ["CLIENT_SLACK_ID"]
client_secret = os.environ["CLIENT_SLACK_SECRET"]

slack_token = os.environ["SLACK_TOKEN"]
sc = SlackClient(slack_token)

# sc.api_call(
#     "chat.postMessage",
#     channel="test",
#     text="Hello from Kudos! :tada:"

# )


@app.route("/begin_auth", methods=["GET"])
def pre_install():
    return '''
      <a href="https://slack.com/oauth/authorize?scope={0}&client_id={1}">
          Sign in with Slack
      </a>
  '''.format("identity.basic", client_id)


@app.route("/init_slack_users", methods=["GET"])
def init_slack_users():

    db.drop_all()
    db.create_all()

    for u in sc.api_call("users.list")["members"]:

        profile = u["profile"]

        if profile.get("email"):
            email = profile.get("email")
            admin = False

            if email == "grzesieks@sparkbit.pl":
                admin = True

            user = User(
                email=email,
                uuid=u.get("id"),
                name=u.get("name"),
                image=profile.get("image_72"),
                display_name=profile.get("real_name_normalized"),
                admin=admin
            )

            db.session.add(user)

    db.session.commit()
    return jsonify({"message": "User has been initilized!"})


@app.route("/listening", methods=["POST", "GET"])
def listening():
    if request.method == "POST":
        event = request.json.get("event")
        print(event)
        # if event.get("type") == "app_mention":
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
