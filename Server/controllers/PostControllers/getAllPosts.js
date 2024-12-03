import { Posts ,Usuarios, Comments, Likes} from "../../database.js";


const getAllPosts = async (req,res) => {

    try {
        
        const posts = await Posts.findAll({
            include: [
                {
                model: Usuarios,
                as: "user_post",
                attributes: ["username"],
                },
                {
                model: Comments,
                as: "comments",
                attributes: ["content", "createdAt"],
                include: [{
                    model: Usuarios,
                    as: "user_comment",
                    attributes: ["username"]
                }],
                },{
                model: Likes,
                as: "likes",
                attributes: ["user_fk"],
                include: [{
                    model: Usuarios,
                    as: "user_like",
                    attributes: ["username"]
                }]
                }
            ],
            order: [["createdAt", "DESC"]],
            });

        return res.status(200).json({posts})

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Server Error"})
    }
}

export default getAllPosts