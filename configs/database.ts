import pg from "pg";

const { Client } = pg;

 
const client = new Client({
  user: String(process.env.PG_USER),
  password: String(process.env.PG_PASSWORD),
  host: String(process.env.PG_HOST),
  port: 5432,
  database: String(process.env.PG_DATABASE),
})
 
export const connectDatabase = async () => {
    try {
        await client.connect()
        console.log("Database has connected!")
    } catch (error) {
        console.log(error);
        console.log("Error db!")
    }
}