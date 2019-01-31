from kudos_api import db
from kudos_api.models import User, Kudos
from datetime import timezone, datetime


def add_kudos(description, recipients, current_user):
    kudos = Kudos(description=description, author=current_user, timestamp=int(datetime.now(
        tz=timezone.utc).timestamp() * 1000), date_string=datetime.now().strftime("%Y-%m-%d"))

    for uuid in recipients:
        user = User.query.filter_by(uuid=uuid).first()
        if user:
            kudos.recipients.append(user)

    db.session.add(kudos)
    db.session.commit()
