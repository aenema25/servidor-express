const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { UserParsedDTO } = require('../dto/user');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const generateToken = (payload) => jwt.sign(payload, PRIVATE_KEY);

const getPayload = (req, res, next) => {
    const headerAuth = req.headers.authorization;

    if (!headerAuth) {
        return res.status(403).send({ status: 'error', msg: 'falto enviar token' });
    }

    const token = headerAuth.split(' ')[1];
    if (token) {
        jwt.verify(token, PRIVATE_KEY, async (e, credential) => {
            if (e) {
                res.status(500).send({ error: 'ocurrio un error inesperado', e });
            } else {
                const user = await userService.get(credential.payload.email);
                req.payload.user = new UserParsedDTO(user);
                next();
            }
        });
    } else {
        return res.status(403).send({ status: 'error', msg: 'falto enviar token' });
    }
};

module.exports = {
    generateToken,
    getPayload,
    PRIVATE_KEY,
};