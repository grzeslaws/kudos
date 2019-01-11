from kudos_api import db
from kudos_api.models import User


def user_item(u):
    user_item = {}
    user_item["id"] = u.id
    user_item["uuid"] = u.uuid
    user_item["first_name"] = u.first_name
    user_item["last_name"] = u.last_name
    user_item["nick"] = u.nick
    user_item["email"] = u.email
    user_item["kudos_number"] = len(u.kudos)
    return user_item


def kudos_item(k):
    kudos_item = {}

    kudos_users = []
    kudos_user = {}

    kudos_item["id"] = k.id
    kudos_item["kuid"] = k.kuid
    kudos_item["description"] = k.description
    kudos_item["timestamp"] = k.timestamp
    kudos_item["users"] = kudos_users

    for u in k.users:
        print(len(u.kudos))
        kudos_user["id"] = u.id
        kudos_user["uuid"] = u.uuid
        kudos_user["first_name"] = u.first_name
        kudos_user["last_name"] = u.last_name
        kudos_user["nick"] = u.nick
        kudos_user["email"] = u.email
        kudos_user["kudos_number"] = len(u.kudos)
        kudos_users.append(kudos_user)

    return kudos_item


def init_users():
    db.drop_all()
    db.create_all()

    users_list = [
        {"first_name": "Blicharz", "last_name": "Sławomir", "nick": "slawekb"},
        {"first_name": "Dakowicz", "last_name": "Tomasz", "nick": "tomekd"},
        {"first_name": "Dziuba", "last_name": "Przemysław", "nick": "przemekd"},
        {"first_name": "Fulara", "last_name": "Jerzy", "nick": "jurekf"},
        {"first_name": "Fulara", "last_name": "Jędrzej", "nick": "jedrek"},
        {"first_name": "Fulara", "last_name": "Kasia", "nick": "kasia"},
        {"first_name": "Fulara", "last_name": "Maciej", "nick": "maciekf"},
        {"first_name": "Kalinowski", "last_name": "Michał", "nick": "michal.kalinowski"},
        {"first_name": "Kamionowski", "last_name": "Marcin", "nick": "marcink"},
        {"first_name": "Krasowski", "last_name": "Marek", "nick": "marekk"},
        {"first_name": "Kręglewski", "last_name": "Michał", "nick": "michal"},
        {"first_name": "Łowiec", "last_name": "Wojciech", "nick": "wojtekl"},
        {"first_name": "Madej", "last_name": "Radosław", "nick": "radekm"},
        {"first_name": "Marciniak", "last_name": "Joanna", "nick": "asiam"},
        {"first_name": "Nienałtowski", "last_name": "Paweł", "nick": "paweln"},
        {"first_name": "Pejas", "last_name": "Łukasz", "nick": "lukaszp"},
        {"first_name": "Piekarczyk", "last_name": "Tomasz", "nick": "tomekp"},
        {"first_name": "Przybysz", "last_name": "Tomasz", "nick": "tomasz.przybysz"},
        {"first_name": "Rut", "last_name": "Karolina", "nick": "karolinar"},
        {"first_name": "Stefek", "last_name": "Mateusz", "nick": "mateuszs"},
        {"first_name": "Supeł", "last_name": "Grzegorz", "nick": "grzesieks"},
        {"first_name": "Tomaszczuk", "last_name": "Dominik", "nick": "dominikt"},
        {"first_name": "Traczyk", "last_name": "Tomasz", "nick": "tomekt"},
        {"first_name": "Więch", "last_name": "Adrian", "nick": "adrianw"},
        {"first_name": "Wojnarowski", "last_name": "Piotr", "nick": "piotrekw"},
        {"first_name": "Wróbel", "last_name": "Grzegorz", "nick": "grzesiekw"},
        {"first_name": "Żendzian", "last_name": "Angelika", "nick": "angelikaz"},
    ]

    def add_user(u):
        u = User(first_name=u["first_name"], last_name=u["last_name"], nick=u["nick"])
        db.session.add(u)

    for ui in users_list:
        add_user(ui)

    db.session.commit()
