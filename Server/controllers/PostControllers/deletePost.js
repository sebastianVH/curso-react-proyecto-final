import { Posts } from "../../database.js"

const deletePost = async (req,res) => { 

    const {id} = req.params

    try {
        const deletedPost = await Posts.destroy({
            where:{
                id
            }
        })

        if (!deletedPost) return res.status(404).json({message: "Post no pudo ser eliminado"})

        return res.status(200).json({message: "Post eliminado con exito"})

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default deletePost