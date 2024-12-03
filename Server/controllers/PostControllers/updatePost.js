import { Posts } from "../../database.js"

const updatePost = async (req,res) => {

    const {id} = req.params
    const {title,content, image} = req.body

    if(!title || !content || !image) return res.status(400).json({message: "Todos los campos son obligatorios"})

    try {
        
        const [updatedPost, isUpdated] = await Posts.update({
            title,
            content,
            imageURL: image
        }, {
            where: {
                id
            }
        })

        if(!updatedPost) return res.status(400).json({message: "Post no pudo ser actualizado"})

        return res.status(200).json({message: "Post actualizado con exito"})

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }

}

export default updatePost