import { Likes } from "../../database.js";

const setLike = async (req,res) => {

    const {id} = req.query //id del post en la query
    const user_id = req.user_id // id del usuario en la sesion del header

    //antes de dar el like, vamos a buscar si ya existe! Si existe el like, lo "destruimos"  y sino, lo "creamos"

    try {

        const liked_post = await Likes.findOne({
            where: {
                post_fk: id,
                user_fk: user_id
            }
        })

        if (!liked_post) {
            await Likes.create({
                post_fk: id,
                user_fk: user_id
            })
            return res.sendStatus(200)
        };
        

        if (liked_post) {
            await Likes.destroy({
                where: {
                    post_fk: id,
                    user_fk: user_id
                }, force: true
            })
            return res.sendStatus(200)
        }

    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default setLike