from kudos_api import app, settings
from flask import jsonify,  render_template
from kudos_api.models import Kudos, User
from sqlalchemy import desc
import pdfkit
import arrow


@app.route("/api/create_pdf/<range>", methods=["POST", "GET"])
def create_pdf(range):

    range_timestamp = arrow.utcnow().floor(range).timestamp * 1000

    kudos = Kudos.query.order_by(desc(Kudos.timestamp)).filter(Kudos.timestamp > range_timestamp)
    users = User.get_top_pick()

    utc = arrow.utcnow()
    local = utc.shift(hours=+1)
    date_now = local.format('YYYY-MM-DD_HH:mm:ss')

    with app.app_context():
        rendered = render_template('kudos_pdf.html',
                                   range=range,
                                   kudos=kudos,
                                   users=users)

    pdfkit.from_string(rendered, settings.DASE_DIR + settings.STATIC_FOLDER + "/print_kudos_" + date_now + ".pdf")

    return jsonify({"pdf_url": settings.STATIC_FOLDER + "/print_kudos_" + date_now + ".pdf"})


@app.route("/api/view_pdf", methods=["POST", "GET"])
def view_pdf(range="week"):

    kudos = Kudos.query.order_by(desc(Kudos.timestamp)).all()
    users = User.get_top_pick()
    return render_template('kudos_pdf.html',
                           range=range,
                           kudos=kudos,
                           users=users)
