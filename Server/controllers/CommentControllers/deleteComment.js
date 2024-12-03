import { Comments } from "../../database.js"


const deleteComment = async (req,res) => {
    const {id} = req.params

    try {
        const deletedComment = await Comments.destroy({
            where:{
                id
            }
        })

        if (!deletedComment) return res.status(404).json({message: "Comentario no pudo ser eliminado"})

        return res.status(200).json({message: "Comentario eliminado con exito"})

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}



export default deleteComment