class UserService {
    constructor(manager) {
        this.manager = manager
    }
    get = (email) => this.manager.get(email)
    create = (user) => this.manager.create(user)
}

module.exports = UserService