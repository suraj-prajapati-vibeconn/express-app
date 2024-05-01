import sequelize from "../database/db";
import { Sequelize, DataTypes } from 'sequelize';

const Car = sequelize.define(
    'Car',
    {
      cid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    }
  );

export default Car;