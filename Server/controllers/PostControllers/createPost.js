import { Posts } from "../../database.js"

const createPost = async (req,res) => {

    const {title,content,image} = req.body
    const user_id = req.user_id

    if (!title || !content || !image || !user_id) return res.status(400).json({message: "Todos los campos son obligatorios"})

    try {
            const createdPost = await Posts.create(
                {
                    title,
                    content,
                    imageURL: image,
                    user_id
                }
            )

        if (!createdPost) return res.status(400).json({message: "Error al crear el post"})
        return res.status(200).json({message: "Post creado con exito"})

        } catch (error) {
            return res.status(500).json({message: "Server Error"})
        }

}

export default createPost