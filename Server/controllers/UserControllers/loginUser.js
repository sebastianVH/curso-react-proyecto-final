import bcrytp from "bcrypt"
import jwt from "jsonwebtoken"
import { Usuarios } from "../../database.js"
import { Op } from "sequelize"
import 'dotenv/config'

const loginUser = async (req,res) => {

    const {user, password} = req.body //el user va a poder ser username o email

    if(!user || !password) return res.status(400).json({message: "Todos los campos son obligatorios"})

    try {
        const userLogin = await Usuarios.findOne({
            where: {
                [Op.or]: [{username: user}, {email: user}]
            }
        })
    
        if (!userLogin) return res.status(400).json({message: "Usuario o contraseña incorrectos"})
        
        const validatePassword = await bcrytp.compareSync(password,userLogin.password)
    
        if (!validatePassword) return res.status(400).json({message: "Usuario o contraseña incorrectos"})
    
        //crear el token!
        const token = jwt.sign({user: userLogin.username, id: userLogin.id},process.env.SECRET_KEY, {expiresIn: "1h"})
    
        res.cookie("token",token, {httpOnly: true, sameSite: "none"})
    
        return res.status(200).json({message: "Login exitoso", token, user: userLogin.username, email: userLogin.email})
            
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default loginUser