import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {conn} from './database.js'
import authenticate from './middlewares/auth.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'
import CookieParser from 'cookie-parser'
import verifyClientSession from './middlewares/verifyClientSession.js'


const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(CookieParser())
app.use(cors({
    //origin: process.env.ORIGIN
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/usuarios',userRouter)
app.use('/posts',postRouter)
app.use('/comentarios',authenticate,commentRouter)
app.use('/access',verifyClientSession)

try {
    await conn.authenticate()
    await conn.sync({ alter: true })
    console.log("Base de datos conectada OK")
    app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`))
    
} catch (error) {
    console.error(error)
}