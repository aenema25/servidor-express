const passport = require("passport")
const local = require('passport-local');
const UserModel = require("../models/usersModel")
const GitHubStrategy = require("passport-github2")
const UsersModel = require('../models/usersModel');
const jwt = require('passport-jwt');
const hashPassword = require('../utils/passwordHash');
const { userService } = require("../services");
const { UserParsedDTO } = require("../dto/user");

const PRIVATE_KEY = process.env.PRIVATE_KEY

const JWTEstrategy = jwt.Strategy;
const JWTExtract = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['token'];
    }

    return token;
};



const initializePassport = () => {
    passport.use(
        'jwt',
        new JWTEstrategy(
            {
                jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
                secretOrKey: PRIVATE_KEY,
            },
            async (jwt_payload, done) => {
                try {
                    const user = await userService.get(jwt_payload.email);
                    done(null, { user: new UserParsedDTO(user), role: jwt_payload.role });
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    passport.use('github', new GitHubStrategy.Strategy({
        clientID: "Iv1.9a8401812d485da3",
        clientSecret: "5d87afe398258d7de68bc86f4c5517f4a245c9f8",
        callbackURL: "http://localhost:8080/api/github/callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UsersModel.findOne({ email: profile.emails[0].value })
            if (!user) {
                const createNewUser = {
                    password: profile._json.node_id,
                    email: profile.emails[0].value,
                    name: profile._json.name,
                    lastName: ' '
                }
                const newUser = await UsersModel.create(createNewUser)
                done(null, newUser)
            } else {
                done(null, user)
            }
        }
        catch (error) {
            return done(error)
        }

    }))
    passport.use(
        'register',
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
                passwordField: 'password',
            },
            async (req, username, password, done) => {
                const { first_name, last_name, age } = req.body;
                try {
                    const userExist = await UsersModel.findOne({ email: username });
                    if (userExist) {
                        done('register error', false, {
                            message: 'el usario existe en la ba',
                        });
                    } else {
                        const hash = await hashPassword(password);
                        const user = await UsersModel.create({
                            first_name,
                            last_name,
                            age,
                            email: username,
                            password: hash,
                        });
                        done(null, user);
                    }
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport