const hashPassword = require("../utils/passwordHash")
const verifyPassword = require("../utils/validatePassword")
const { userService } = require("../services");
const { UserInsertDto, UserParsedDTO } = require("../dto/user");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
    try {
        const user = await userService.get(req.body.email)
        if (user) {
            verifyPassword(req.body.password, user.password).then(isValid => {
                if (isValid) {
                    const userData = new UserParsedDTO(user)
                    const userToken = generateToken({ email: userData.email, role: userData.rol })
                    res
                        .status(200)
                        .cookie('token', userToken, { maxAge: 30000000, httpOnly: true })
                        .send({
                            message: "Inicio de sesion exitoso",
                            user: { userData }
                        })
                } else {
                    res.status(400).send({ message: "Contraseña incorrecta, intente nuevamente" })
                }
            })
        } else {
            res.status(400).send({ message: "Usuario no encontrado" })
        }
    } catch (e) {
        console.log(e)
    }
}

exports.github_callback = async (req, res) => {
    const userData = new UserParsedDTO(req.user)
    const userToken = generateToken({ email: userData.email, role: userData.rol })
    res
        .status(200)
        .cookie('token', userToken, { maxAge: 30000, httpOnly: true })
        .send({
            message: "Inicio de sesion exitoso",
            user: { userData }
        })
}

exports.signup = async (req, res) => {
    if (req.body.email && req.body.password && req.body.first_name && req.body.last_name) {
        hashPassword(req.body.password).then(async password => {
            const parsedUser = new UserInsertDto(req.body, password)
            try {
                const insertUser = await userService.create(parsedUser)
                if (insertUser) {
                    res.status(200).send({ message: "Usuario creado con exito, en breve seras redirigido a la pagina de inicio de sesion", success: true })
                } else {
                    res.status(400).send({ message: "Ocurrio un error inesperado, intente nuevamente", success: false })
                }
            } catch (e) {
                console.log(e)
            }
        })
    } else {
        res.status(400).send({ message: "Uno o mas campos estan vacios, intente nuevamente", success: false })
    }
}

exports.current = (req, res) => {
    res.status(200).send(req.user)
}

exports.get_all_users = async (req, res) => {
    const users = await userService.getAll()
    res.status(200).send({
        message: "Usuarios",
        users: { users }
    })
}

exports.delete_inactive_users = (req, res) => {

}