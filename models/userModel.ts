import sequelize from "../database/db";
import { Sequelize, DataTypes } from 'sequelize';

const User = sequelize.define(
    'User',
    {
      uid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    }
  );

export default User;

import Car from "./carModel";
import CompanyDirector from "./companyDirectorModel";
import Company from "./companyModel";
import Director from "./directorModel";

User.hasMany(Car, { foreignKey: 'uid' });


Company.belongsToMany(Director, { through: CompanyDirector, foreignKey: 'com_id' });
Director.belongsToMany(Company, { through: CompanyDirector, foreignKey: 'did' });

