import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect:'postgres'
})

const checkConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

checkConnection();

sequelize.sync().then(()=>console.log('created tables')).catch(()=>console.log('Edoor'))

export default sequelize;
