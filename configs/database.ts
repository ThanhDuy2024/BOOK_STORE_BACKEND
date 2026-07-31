import { Sequelize } from "sequelize"
 
export const sequelize = new Sequelize(String(process.env.PG_DATABASE), String(process.env.PG_USER), String(process.env.PG_PASSWORD), {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            alter: true
        })
        console.log("Database has connected!")
    } catch (error) {
        console.log(error);
        console.log("Error db!")
    }
}