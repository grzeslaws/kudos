from kudos_api import app, settings
from flask import jsonify
from kudos_api.models import Kudos, User
from sqlalchemy import desc
import pdfkit
import arrow
import os
from kudos_api.routes import token_required


@app.route("/api/create_pdf/<range>", methods=["POST", "GET"])
@token_required
def create_pdf(current_user, range):

    range_timestamp = arrow.utcnow().floor(range).timestamp * 1000

    kudos = Kudos.query.order_by(desc(Kudos.timestamp)).filter(Kudos.timestamp > range_timestamp)
    users = User.get_top_pick()

    utc = arrow.utcnow()
    local = utc.shift(hours=+1)
    date_now = local.format('YYYY-MM-DD_HH:mm:ss')

    html_kudos = '''
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <div><h2>Last {} kudos</h2>
    '''.format(range)

    html_kudos += '<ul class="kudos-list">'
    for d in kudos:
        html_kudos += '<div class="date">{}</div>'.format(d.date_string)
        html_kudos += '<li class="list-item">'
        html_kudos += d.description.replace("//cdn", "http://cdn")
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

    html_kudos += '<div><body></html>'

    css = os.path.join(settings.BASE_DIR + settings.STATIC_FOLDER, 'kudos_style.css')

    pdfkit.from_string(html_kudos, settings.BASE_DIR + settings.STATIC_FOLDER +
                       "/print_kudos_" + date_now + ".pdf", css=css)

    return jsonify({"pdf_url": settings.STATIC_FOLDER + "/print_kudos_" + date_now + ".pdf"})
