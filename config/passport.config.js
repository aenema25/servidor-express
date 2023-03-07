const passport = require("passport")
const UserModel = require("../models/usersModel")

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport