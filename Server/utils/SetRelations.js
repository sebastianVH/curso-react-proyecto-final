import { Usuarios,Posts,Comments,Likes } from "../database.js";


const setRelations = () => {

    //VAmos a crear las relaciones

    Usuarios.hasMany(Posts,{foreignKey:'user_id',as: 'user_post'})
    Posts.belongsTo(Usuarios,{foreignKey:'user_id',as: 'user_post'})

    Usuarios.hasMany(Comments,{foreignKey:'user_id',as: 'user_comment'})
    Comments.belongsTo(Usuarios,{foreignKey:'user_id',as  : 'user_comment'})

    Posts.hasMany(Comments,{foreignKey:'post_id',as: 'comments'})
    Comments.belongsTo(Posts,{foreignKey:'post_id',as: 'comments'})

    //un usuario puede dar like a muchos post, y un post puede tener el like de muchos usuarios

    Posts.hasMany(Likes,{foreignKey:'post_fk',as: 'likes'})
    Posts.belongsToMany(Usuarios,{through:Likes , foreignKey: 'post_fk'})
    Usuarios.belongsToMany(Posts,{through:Likes, foreignKey: 'user_fk'})
    
    Likes.belongsTo(Usuarios,{foreignKey:'user_fk',as: 'user_like'})

}

export default setRelations