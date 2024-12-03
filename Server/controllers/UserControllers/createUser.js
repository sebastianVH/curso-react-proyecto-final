import { Usuarios } from "../../database.js"
import { Op } from "sequelize"

const createUser = async (req,res) => {

    const {username, password, email} = req.body
    //si algun campo esta vacio, las devoluciones son 400

    try {
        if(!username || !password || !email) return res.status(400).json({message: "Todos los campos son obligatorios"})
        //validar que no haya un usuario en la base de datos, con ese mail o username ya existente
        const user = await Usuarios.findOne({
            where: {
            [Op.or]: [{username}, {email}]
            }
        })
        if (user) return res.status(400).json({message: "El usuario ya existe o este mail se encuentra registrado"})

        const createdUser = await Usuarios.create({username, password, email})

        if (createdUser) return res.status(200).json({message: "Usuario creado con exito!"})

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default createUser