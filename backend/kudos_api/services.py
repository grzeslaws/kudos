from kudos_api import db
from kudos_api.models import User, Kudos
from datetime import timezone, datetime
from kudos_api.serializers import user_item


def add_kudos(description, recipients, current_user):
    kudos = Kudos(description=description, author=current_user, timestamp=int(datetime.now(
        tz=timezone.utc).timestamp() * 1000), date_string=datetime.now().strftime("%Y-%m-%d"))

    for uuid in recipients:
        user = User.query.filter_by(uuid=uuid).first()
        if user:
            kudos.recipients.append(user)

    db.session.add(kudos)
    db.session.commit()


def get_top_picks():
    ul = [user_item(u) for u in User.get_all()]
    sorted_ul = sorted(ul, key=lambda k: k["kudos_received"], reverse=True)
    sorted_ul_without_zero = [u for u in sorted_ul if u["kudos_received"] > 0]
    return sorted_ul_without_zero[0:3]
