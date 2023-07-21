const crypto = require("crypto");

class UserInsertDto {
    constructor(user, password) {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.age = user.age ?? ''
        this.password = password
        this.cartID = `CART-${crypto.randomBytes(3 * 4).toString('base64')}`
    }
}

class UserParsedDTO {
    constructor(user) {
        this._id = user._id
        this.email = user.email
        this.fullName = `${user.first_name} ${user.last_name}`
        this.rol = user.rol
        this.age = user.age
        this.cartID = user.cartID
    }
}

module.exports = {
    UserInsertDto,
    UserParsedDTO
}