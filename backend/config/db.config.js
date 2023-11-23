import dotenv from "dotenv";

dotenv.config();
console.log(process.env, "process.env")
export default {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "mysql",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}