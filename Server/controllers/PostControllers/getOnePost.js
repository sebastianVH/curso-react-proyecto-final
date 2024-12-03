import { Posts,Usuarios,Comments } from "../../database.js"


const getOnePost = async (req,res) => { 

    const {id} = req.params

    try {
        const post = await Posts.findByPk(id,{
            include:[
                {
                model: Usuarios,
                as: "user_post",
                attributes: ["username"],
                },
                {
                model: Comments,
                as: "comments",
                attributes: ["content", "createdAt"],
                order: [["createdAt", "DESC"]],
                },
            ]
        })

        if(!post) return res.status(404).json({message: "Post no encontrado"})
        
        return res.status(200).json({post})


    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default getOnePost