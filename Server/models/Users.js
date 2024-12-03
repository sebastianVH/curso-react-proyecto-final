import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const UserModel = (sequelize) => {
    sequelize.define('Usuarios',{
        username:{
            type: DataTypes.STRING(30),
            allowNull:false
        },
        password:{
            //aqui podemos poner los set y los get!
            type: DataTypes.STRING,
            allowNull:false,
            set(value){
                const saltos = 10
                const pass = bcrypt.hashSync(value,saltos)
                this.setDataValue('password',pass)
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },{
        //vamos a colocar el timestamp en true, para usar el deletedAt, y que nuestra tabal sea paranoid (que los registros no se borren de la base de datos)
        timestamps: true,
        paranoid: true,
        deletedAt: true,
    })
}

export default UserModel