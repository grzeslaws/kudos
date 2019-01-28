from kudos_api import app, settings
from flask import jsonify,  render_template
from kudos_api.models import Kudos, User
from sqlalchemy import desc
import pdfkit
import arrow
import os


@app.route("/api/create_pdf/<range>", methods=["POST", "GET"])
def create_pdf(range):

    range_timestamp = arrow.utcnow().floor(range).timestamp * 1000

    kudos = Kudos.query.order_by(desc(Kudos.timestamp)).filter(Kudos.timestamp > range_timestamp)
    users = User.get_top_pick()

    utc = arrow.utcnow()
    local = utc.shift(hours=+1)
    date_now = local.format('YYYY-MM-DD_HH:mm:ss')

    html_kudos = '<div><h2>Last {} kudos</h2>'.format(range)

    html_kudos += '<ul class="kudos-list">'
    for d in kudos:
        html_kudos += '<div class="date">{}</div>'.format(d.date_string)
        html_kudos += '<li class="list-item">'
        html_kudos += d.description
        html_kudos += "</li>"
    html_kudos += '</ul>'

    html_kudos += '<h2>Top picks last {}</h2>'.format(range)

    html_kudos += '<ul class="users-list">'
    for u in users:
        html_kudos += '<li class="user-item">'
        html_kudos += '<img src={} class="user-image">'.format(u.image)
        html_kudos += '<div class="wrapper-user-data">'
        html_kudos += '<div class="user-name">{}</div>'.format(u.display_name)
        html_kudos += '<div>{} kudos</div>'.format(len(u.kudos))
        html_kudos += '</div>'
        html_kudos += "</li>"
    html_kudos += '</ul>'

    html_kudos += '<div>'

    print(html_kudos)

    css = os.path.join(settings.BASE_DIR + settings.STATIC_FOLDER, 'kudos_style.css')

    pdfkit.from_string(html_kudos, settings.BASE_DIR + settings.STATIC_FOLDER +
                       "/print_kudos_" + date_now + ".pdf", css=css)

    return jsonify({"pdf_url": settings.STATIC_FOLDER + "/print_kudos_" + date_now + ".pdf"})
