const usersModel = require("../../models/usersModel")

class UserManager {
    get = (email) => usersModel.findOne({ email: email })
    create = (user) => usersModel.create(user)
}

module.exports = new UserManager()