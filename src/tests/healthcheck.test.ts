import { beforeEach, jest, describe, test } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import { AppDataSource } from '../db/dataSource'

jest.mock('../db/dataSource', () => ({
  AppDataSource: {
    query: jest.fn(),
  },
}))

export const mockedQuery = AppDataSource.query as jest.MockedFunction<
  typeof AppDataSource.query
>

describe('Healthcheck Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('Should return status 200 for a successfull call healthcheck', async () => {
    const response = await request(app).get('/api/healthcheck')
    expect(mockedQuery).toHaveBeenCalledWith('SELECT 1')
    expect(response.body.message).toEqual('App is fine!')
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs calling healthcheck', async () => {
    mockedQuery.mockImplementationOnce(() => {
      throw new Error('An error has occurred')
    })
    const response = await request(app).get('/api/healthcheck')
    expect(mockedQuery).toHaveBeenCalledWith('SELECT 1')
    expect(mockedQuery).not.toHaveReturned()
    expect(response.body.message).toEqual('Internal Server Error')
    expect(response.status).toEqual(500)
  })
})
