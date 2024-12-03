import jwt from "jsonwebtoken"
import 'dotenv/config'



const authenticate = (req,res,next) => {

    const token = req.headers?.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).send('Token not found')
    }

    try {
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        
        req.user_id = verifyToken.id
        next()
        
    } catch (error) {
        return res.status(401).send('Unauthorized')
        
    }


}

export default authenticate