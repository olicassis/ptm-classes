import { jest } from '@jest/globals'

import { AppDataSource } from '../../db/dataSource'

jest.mock('../../db/dataSource', () => ({
  AppDataSource: {
    query: jest.fn(),
  },
}))

export const mockedQuery = AppDataSource.query as jest.MockedFunction<
  typeof AppDataSource.query
>
