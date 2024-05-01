import sequelize from "../database/db";
import { Sequelize, DataTypes } from 'sequelize';

const Company = sequelize.define(
    'Company',
    {
      com_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

export default Company;