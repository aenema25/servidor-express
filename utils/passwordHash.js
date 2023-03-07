const bcrypt = require("bcrypt")
const saltRounds = 13

const hashPassword = async (password) => {
    if (password) {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }
}

module.exports = hashPassword