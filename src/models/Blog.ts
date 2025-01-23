import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number; // Foreign key to User
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'blogs',
    timestamps: true,
  }
);

export default Blog;
