import { describe, test } from '@jest/globals'
import { MockTypeORM } from 'mock-typeorm'
import request from 'supertest'

import app from '../app'
import { ProfileEntity } from '../db/entity/Profile'

import { mockedProfiles } from './mocks/profile'

describe('Get Profiles Test Suite', () => {
  let typeorm: MockTypeORM

  beforeAll(() => {
    typeorm = new MockTypeORM()
  })

  afterEach(() => {
    typeorm.resetAll()
  })

  afterAll(() => {
    typeorm.restore()
  })

  test('Should return status 200 for a successfull call to get profiles with existing profiles', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles, 'find')
    const response = await request(app).get('/api/profiles')
    expect(response.body.data).toEqual(mockedProfiles)
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successfull call to get profiles with no existing profiles', async () => {
    typeorm.onMock(ProfileEntity).toReturn([], 'find')
    const response = await request(app).get('/api/profiles')
    expect(response.body.data.length).toEqual(0)
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs calling get profiles', async () => {
    typeorm
      .onMock(ProfileEntity)
      .toReturn(new Error('An error has occurred'), 'find')
    const response = await request(app).get('/api/profiles')
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })
})
