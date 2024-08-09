import { jest } from '@jest/globals'

import { AppDataSource } from '../../db/dataSource'
import { initializeDatasource } from '../../db/repository/base'

jest.mock('../../db/repository/base', () => ({
  initializeDatasource: jest.fn(),
}))

jest.mock('../../db/dataSource', () => ({
  AppDataSource: {
    query: jest.fn(),
  },
}))

export const mockedInitializeDatasource =
  initializeDatasource as jest.MockedFunction<typeof initializeDatasource>

export const mockedQuery = AppDataSource.query as jest.MockedFunction<
  typeof AppDataSource.query
>
