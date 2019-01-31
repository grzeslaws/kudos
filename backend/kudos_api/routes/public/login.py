from kudos_api import app
from flask import request, jsonify
import requests
from kudos_api.models import User
import jwt
import datetime


@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        token = request.json["tokenId"]

        req = requests.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={}".format(token)).json()
        email = req["email"]
        user = User.query.filter_by(email=email).first()
        if user:
            data = {
                "uuid": user.uuid,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=280)
            }
            token = jwt.encode(
                data, app.config["SECRET_KEY"], "HS256").decode("utf-8")
            res = jsonify({"kudos_auth_token": token})
            res.set_cookie("kudos_auth_token", token)
            return res, 200
        else:
            return jsonify({"message": "No such user here!"}), 550
