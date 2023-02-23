const express = require('express');
const UsersModel = require('../models/usersModel');
const router = express.Router();

/* Put products in cart. */
router.post('/login', async function (req, res, next) {
    const user = await UsersModel.findOne({ email: req.body.email })
    if (user) {
        if (user.password === req.body.password) {
            console.log(user)
            delete user.password
            res.status(200).send({
                message: "Inicio de sesion exitoso",
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName,
                    rol: user.rol
                }
            })
        } else {
            res.status(400).send({ message: "Contraseña incorrecta, intente nuevamente" })
        }
    } else {
        res.status(400).send({ message: "Usuario no encontrado" })
    }

});

/* Put products qty in cart. */
router.post('/signup', async function (req, res, next) {
    if (req.body.email && req.body.password && req.body.name && req.body.lastName) {
        const insertUser = await UsersModel.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
        })
        console.log(insertUser)
        if (insertUser) {
            res.status(200).send({ message: "Usuario creado con exito, en breve seras redirigido a la pagina de inicio de sesion", success: true })
        } else {
            res.status(400).send({ message: "Ocurrio un error inesperado, intente nuevamente", success: false })
        }
    } else {
        res.status(400).send({ message: "Uno o mas campos estan vacios, intente nuevamente", success: false })
    }
});




module.exports = router;