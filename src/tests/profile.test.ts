import { describe, test } from '@jest/globals'
import { MockTypeORM } from 'mock-typeorm'
import request from 'supertest'

import app from '../app'
import { ProfileEntity } from '../db/entity/Profile'
import { ProfileSubjectEntity } from '../db/entity/ProfileSubject'

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

  test('Should return status 200 for a successful call to get profiles with existing profiles', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles, 'find')
    const response = await request(app).get('/api/profiles')
    expect(response.body.data).toEqual(mockedProfiles)
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profiles with no existing profiles', async () => {
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

describe('Get Profile By Id Test Suite', () => {
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

  test('Should return status 200 for a successful call to get profile by id with existing profile', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[0], 'findOneBy')
    const response = await request(app).get(
      '/api/profile/3a5ada5e-940f-439a-b333-bb4d48159cd9',
    )
    expect(response.body.data).toEqual(mockedProfiles[0])
    expect(response.status).toEqual(200)
  })

  test('Should return status 404 for a successful call to get profile by id with no existing profile', async () => {
    typeorm.onMock(ProfileEntity).toReturn(null, 'findOneBy')
    const response = await request(app).get(
      '/api/profile/fa39f8bd-8672-4691-bb7e-978109af0f30',
    )
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toEqual('Profile not found')
    expect(response.status).toEqual(404)
  })

  test('Should return status 500 when an error occurs calling get profile by id', async () => {
    typeorm
      .onMock(ProfileEntity)
      .toReturn(new Error('An error has occurred'), 'findOneBy')
    const response = await request(app).get(
      '/api/profile/3a5ada5e-940f-439a-b333-bb4d48159cd9',
    )
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })
})

describe('Get Profile Subjects By Profile Id Test Suite', () => {
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

  test('Should return status 200 for a successful call to get profile with an associated profile subject', async () => {
    typeorm
      .onMock(ProfileSubjectEntity)
      .toReturn(mockedProfiles[1].profileSubject, 'findBy')
    const response = await request(app).get(
      '/api/profile/ea123e3a-d922-4d37-833e-022375631298/subjects',
    )
    expect(response.body.data).toEqual(mockedProfiles[1].profileSubject)
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profile with no associated profile subject', async () => {
    typeorm.onMock(ProfileSubjectEntity).toReturn([], 'findBy')
    const response = await request(app).get(
      '/api/profile/3a5ada5e-940f-439a-b333-bb4d48159cd9/subjects',
    )
    expect(response.body.data.length).toEqual(0)
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs calling get profile subjects by profile id', async () => {
    typeorm
      .onMock(ProfileSubjectEntity)
      .toReturn(new Error('An error has occurred'), 'findBy')
    const response = await request(app).get(
      '/api/profile/ea123e3a-d922-4d37-833e-022375631298/subjects',
    )
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })
})
