from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from kudos_api import settings
import uuid
import os


def generate_uuid():
    return str(uuid.uuid4())


app = Flask(__name__)
CORS(app)


app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = settings.SQLALCHEMY_DATABASE_URI

db = SQLAlchemy(app)

from kudos_api.routes.public import kudos  # noqa: E402, F401
from kudos_api.routes.public import user  # noqa: E402, F401
from kudos_api.routes.public import pdf  # noqa: E402, F401
from kudos_api.routes.public import login  # noqa: E402, F401
from kudos_api.routes.public import slack  # noqa: E402, F401
