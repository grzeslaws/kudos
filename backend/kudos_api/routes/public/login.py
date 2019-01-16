from kudos_api import app
from flask import request, jsonify


@app.route("/api/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        print(request.json)

        return jsonify({"message": "Login"}), 201
