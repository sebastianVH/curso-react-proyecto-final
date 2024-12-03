import {Sequelize }from 'sequelize'
import 'dotenv/config'
import UserModel from './models/Users.js'
import PostModel from './models/Posts.js'
import CommentModel from './models/Comments.js'
import setRelations from './utils/SetRelations.js'
import LikeModel from './models/Likes.js'

const USERNAME_DB = process.env.USERNAME_DB  
const PASSWORD_DB = process.env.PASSWORD_DB
const HOST_DB = process.env.HOST_DB
const PORT_DB = process.env.PORT_DB
const NAME_DB = process.env.NAME_DB

const conn = new Sequelize(`postgres://${USERNAME_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`,{
    logging: false
})

UserModel(conn)
PostModel(conn)
CommentModel(conn)
LikeModel(conn)

const {Usuarios,Posts,Comments,Likes} = conn.models

setRelations()

export {conn,Usuarios,Posts,Comments,Likes}