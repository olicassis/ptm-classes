import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? '',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? '',
  logging: true,
  entities: [__dirname + '/entities/*.js'],
  migrations: [__dirname + '/migrations/*.js'],
})
