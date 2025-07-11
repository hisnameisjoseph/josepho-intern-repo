import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./user/entities/user.entity" // <-- use correct entity
import { config } from "dotenv"
config() // Load environment variables from .env file

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Ensure tables are created before seeding
    logging: false,
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
// Log the connection details for debugging
console.log('📦 TypeORM connecting to DB:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
