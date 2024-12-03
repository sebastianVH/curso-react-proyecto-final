import { DataTypes } from "sequelize";


const PostModel = (sequelize) => {
    sequelize.define('Posts',{
        title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        imageURL:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps: true,
        paranoid: true,
        deletedAt: true,
    })
}

export default PostModel