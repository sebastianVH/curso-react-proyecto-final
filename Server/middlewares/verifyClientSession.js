import jwt from "jsonwebtoken"


const verifyClientSession = async (req,res,next) => {

    const token = req.headers?.authorization?.split(' ')[1]

    if(!token){
        return res.status(403).json({message: "Token not found", title: "Unauthorized"})
    }
    try {
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY) 
    } catch (error) {
        return res.status(403).json({message: "Token not valid", title: "Unauthorized"})
    }

    return res.sendStatus(200)

}

export default verifyClientSession