const passport = require("passport")
const UserModel = require("../models/usersModel")
const GitHubStrategy = require("passport-github2")
const UsersModel = require('../models/usersModel');

const initializePassport = () => {
    passport.use('github', new GitHubStrategy.Strategy({
        clientID: "Iv1.9a8401812d485da3",
        clientSecret: "5d87afe398258d7de68bc86f4c5517f4a245c9f8",
        callbackURL: "http://localhost:8080/api/github/callback",
        scope: ['user:email'] 
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await UsersModel.findOne({ email: profile.emails[0].value })
            console.log(user)
            if (!user) {
                const createNewUser = {
                    password: profile._json.node_id,
                    email: profile.emails[0].value,
                    name: profile._json.name,
                    lastName: ' ' 
                }
                console.log(createNewUser)
                const newUser = await UsersModel.create(createNewUser)
                console.log(newUser)
                done(null, newUser)
            } else {
                done(null, user)
            }
        }
        catch (error) {
            return done(error)
        }

    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport