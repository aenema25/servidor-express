const usersModel = require("../../models/usersModel")

class UserManager {
    get = (email) => usersModel.findOne({ email: email })
    create = (user) => usersModel.create(user)
    getAll = () => usersModel.find({}, { first_name: 1, last_name: 1, email: 1, rol: 1, lastConnection: 1 })
}

module.exports = new UserManager()