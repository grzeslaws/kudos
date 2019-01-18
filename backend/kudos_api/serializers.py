from kudos_api import db
from kudos_api.models import User


def user_item(u):
    user_item = {}
    user_item["id"] = u.id
    user_item["uuid"] = u.uuid
    user_item["display_name"] = u.display_name
    user_item["name"] = u.name
    user_item["email"] = u.email
    user_item["image"] = u.image
    user_item["kudos_number"] = len(u.kudos)
    return user_item


def kudos_item(k):
    kudos_item = {}

    kudos_users = []

    kudos_item["id"] = k.id
    kudos_item["kuid"] = k.kuid
    kudos_item["description"] = k.description
    kudos_item["timestamp"] = k.timestamp
    kudos_item["users"] = kudos_users

    for u in k.users:
        kudos_user = {}
        kudos_user["id"] = u.id
        kudos_user["uuid"] = u.uuid
        kudos_user["display_name"] = u.display_name
        kudos_user["name"] = u.name
        kudos_user["email"] = u.email
        kudos_user["image"] = u.image
        kudos_user["kudos_number"] = len(u.kudos)
        kudos_users.append(kudos_user)

    return kudos_item


# def init_users():
#     db.drop_all()
#     db.create_all()

#     users_list = [
#         {"last_name": "Blicharz", "first_name": "Sławomir", "nick": "slawekb"},
#         {"last_name": "Dakowicz", "first_name": "Tomasz", "nick": "tomekd"},
#         {"last_name": "Dziuba", "first_name": "Przemysław", "nick": "przemekd"},
#         {"last_name": "Fulara", "first_name": "Jerzy", "nick": "jurekf"},
#         {"last_name": "Fulara", "first_name": "Jędrzej", "nick": "jedrek"},
#         {"last_name": "Fulara", "first_name": "Kasia", "nick": "kasia"},
#         {"last_name": "Fulara", "first_name": "Maciej", "nick": "maciekf"},
#         {"last_name": "Kalinowski", "first_name": "Michał", "nick": "michal.kalinowski"},
#         {"last_name": "Kamionowski", "first_name": "Marcin", "nick": "marcink"},
#         {"last_name": "Krasowski", "first_name": "Marek", "nick": "marekk"},
#         {"last_name": "Kręglewski", "first_name": "Michał", "nick": "michal"},
#         {"last_name": "Łowiec", "first_name": "Wojciech", "nick": "wojtekl"},
#         {"last_name": "Madej", "first_name": "Radosław", "nick": "radekm"},
#         {"last_name": "Marciniak", "first_name": "Joanna", "nick": "asiam"},
#         {"last_name": "Nienałtowski", "first_name": "Paweł", "nick": "paweln"},
#         {"last_name": "Pejas", "first_name": "Łukasz", "nick": "lukaszp"},
#         {"last_name": "Piekarczyk", "first_name": "Tomasz", "nick": "tomekp"},
#         {"last_name": "Przybysz", "first_name": "Tomasz", "nick": "tomasz.przybysz"},
#         {"last_name": "Rut", "first_name": "Karolina", "nick": "karolinar"},
#         {"last_name": "Stefek", "first_name": "Mateusz", "nick": "mateuszs"},
#         {"last_name": "Supeł", "first_name": "Grzegorz", "nick": "grzesieks"},
#         {"last_name": "Tomaszczuk", "first_name": "Dominik", "nick": "dominikt"},
#         {"last_name": "Traczyk", "first_name": "Tomasz", "nick": "tomekt"},
#         {"last_name": "Więch", "first_name": "Adrian", "nick": "adrianw"},
#         {"last_name": "Wojnarowski", "first_name": "Piotr", "nick": "piotrekw"},
#         {"last_name": "Wróbel", "first_name": "Grzegorz", "nick": "grzesiekw"},
#         {"last_name": "Żendzian", "first_name": "Angelika", "nick": "angelikaz"},
#     ]

#     def add_user(u):
#         u = User(first_name=u["first_name"], last_name=u["last_name"], nick=u["nick"])
#         db.session.add(u)

#     for ui in users_list:
#         add_user(ui)

#     db.session.commit()
