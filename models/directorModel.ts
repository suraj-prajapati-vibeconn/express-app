import sequelize from "../database/db";
import { Sequelize, DataTypes } from 'sequelize';

const Director = sequelize.define(
    'Director',
    {
      did:{
        type:DataTypes.INTEGER,
        autoIncrement:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

export default Director;