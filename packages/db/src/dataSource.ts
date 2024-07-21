import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [],
  migrations: [__dirname + './migrations/*.ts'],
})
