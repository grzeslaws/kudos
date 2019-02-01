def user_item(u):
    user_item = {}
    user_item["id"] = u.id
    user_item["uuid"] = u.uuid
    user_item["display_name"] = u.display_name
    user_item["name"] = u.name
    user_item["email"] = u.email
    user_item["image"] = u.image
    user_item["admin"] = u.admin
    user_item["kudos_received"] = len(u.kudos_received)
    user_item["kudos_given"] = len(u.kudos_given)
    return user_item


def kudos_item(k):
    kudos_item = {}

    kudos_item["id"] = k.id
    kudos_item["kuid"] = k.kuid
    kudos_item["description"] = k.description
    kudos_item["timestamp"] = k.timestamp
    kudos_item["recipients"] = [user_item(u) for u in k.recipients]
    kudos_item["voters"] = [user_item(u) for u in k.voters]
    kudos_item["author"] = user_item(k.author)

    return kudos_item
