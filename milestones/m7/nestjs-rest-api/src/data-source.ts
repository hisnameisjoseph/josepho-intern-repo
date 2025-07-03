import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { config } from "dotenv"
config() // Load environment variables from .env file

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false, // Set to false in production or when using migrations
    logging: false,
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
