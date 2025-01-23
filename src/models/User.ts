import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Blog from './Blog';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public refreshToken!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default User;
