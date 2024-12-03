import { DataTypes } from "sequelize";


const CommentModel = (sequelize) => {
    sequelize.define('Comments', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        timestamps: true,
        paranoid: true,
        deletedAt: true
    })
}

export default CommentModel