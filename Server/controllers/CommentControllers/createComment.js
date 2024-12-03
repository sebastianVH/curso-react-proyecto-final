import { Comments } from "../../database.js"

const createComment = async (req,res) => {

    const {content,post_id} = req.body
    const user_id = req.user_id

    if(!content || !user_id || !post_id) return res.status(400).json({message: "Todos los campos son obligatorios"})
    
    try {
        const createdComment = await Comments.create({content,user_id,post_id})

        if(!createdComment) return res.status(400).json({message: "Error al crear el comentario"})
        return res.status(200).json({message: "Comentario creado con exito"})
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default createComment