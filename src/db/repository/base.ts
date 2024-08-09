import { AppDataSource } from '../dataSource'

export async function initializeDatasource(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
}
