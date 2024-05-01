import sequelize from "../database/db";
import { Sequelize, DataTypes } from 'sequelize';

const CompanyDirector = sequelize.define(
    'CompanyDirector',
    {
      id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    }
  );

export default CompanyDirector;