class UserInsertDto {
    constructor(user, password) {
        this.first_name = user.name
        this.last_name = user.lastName
        this.email = user.email
        this.age = 30 //cambiar luego
        this.password = password
    }
}

class UserParsedDTO {
    constructor(user) {
        this._id = user._id
        this.email = user.email
        this.fullName = `${user.first_name} ${user.last_name}`
        this.rol = user.rol
        this.age = user.age
    }
}

module.exports = {
    UserInsertDto,
    UserParsedDTO
}