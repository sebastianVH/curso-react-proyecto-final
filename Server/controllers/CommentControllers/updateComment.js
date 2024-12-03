import { Comments } from "../../database.js"


const updateComment = async (req,res) => {

    const {id} = req.params
    const {content} = req.body


    if(!content) return res.status(400).json({message: "Todos los campos son obligatorios"})

    try {
        const [updatedComment, isUpdated] = await Comments.update({
            content
        }, {
            where: {
                id
            }
        })

        if(!updatedComment) return res.status(400).json({message: "Comentario no pudo ser actualizado"})

        return res.status(200).json({message: "Comentario actualizado con exito"})

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }

}


export default updateComment