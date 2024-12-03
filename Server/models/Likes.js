import { DataTypes } from "sequelize";

const LikeModel = (sequelize) => {
    sequelize.define('Likes',{},{
        timestamps: true,
        paranoid: true,
        deletedAt: true,
    })
}

export default LikeModel