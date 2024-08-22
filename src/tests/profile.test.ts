import { describe, test } from '@jest/globals'
import { MockTypeORM } from 'mock-typeorm'
import request from 'supertest'

import app from '../app'
import { ProfileEntity } from '../db/entity/Profile'
import { ProfileScheduleEntity } from '../db/entity/ProfileSchedule'
import { ProfileSubjectEntity } from '../db/entity/ProfileSubject'
import { ResourceNotCreatedError } from '../errors/database.errors'

import {
  mockedCreateProfileInputInvalid,
  mockedCreateProfileInputValid,
  mockedProfiles,
  mockedProfileSchedule,
  mockedProfileSubject,
} from './mocks/profile'

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

  test('Should return status 200 for a successful call to get profile with profile subjects', async () => {
    typeorm
      .onMock(ProfileSubjectEntity)
      .toReturn([mockedProfileSubject], 'findBy')
    const response = await request(app).get(
      '/api/profile/ea123e3a-d922-4d37-833e-022375631298/subjects',
    )
    expect(response.body.data).toEqual([mockedProfileSubject])
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profile with no profile subjects', async () => {
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

describe('Get Profile Schedules By Profile Id Test Suite', () => {
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

  test('Should return status 200 for a successful call to get profile with profile schedules', async () => {
    const plainMockedProfileSchedule = [mockedProfileSchedule].map(
      (schedule) => ({
        id: schedule.id,
        date: schedule.date.toISOString(),
        status: schedule.status,
        classRequest: {
          id: schedule.classRequest.id,
          profileScheduleId: schedule.classRequest.profileScheduleId,
          studentProfileId: schedule.classRequest.studentProfileId,
        },
      }),
    )
    typeorm
      .onMock(ProfileScheduleEntity)
      .toReturn([mockedProfileSchedule], 'find')
    const response = await request(app).get(
      '/api/profile/ea123e3a-d922-4d37-833e-022375631298/schedules',
    )
    expect(response.body.data).toEqual(plainMockedProfileSchedule)
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profile with no profile schedules', async () => {
    typeorm.onMock(ProfileScheduleEntity).toReturn([], 'find')
    const response = await request(app).get(
      '/api/profile/3a5ada5e-940f-439a-b333-bb4d48159cd9/schedules',
    )
    expect(response.body.data.length).toEqual(0)
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs calling get profile schedules by profile id', async () => {
    typeorm
      .onMock(ProfileScheduleEntity)
      .toReturn(new Error('An error has occurred'), 'find')
    const response = await request(app).get(
      '/api/profile/ea123e3a-d922-4d37-833e-022375631298/schedules',
    )
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })
})

describe('Post Profile Test Suite', () => {
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

  test('Should return status 200 for a successful call to post profile', async () => {
    typeorm.onMock(ProfileEntity).toReturn([mockedProfiles[0]], 'save')
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(response.body.data).toEqual(mockedProfiles[0])
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 if no profile is created - null', async () => {
    typeorm.onMock(ProfileEntity).toReturn(null, 'save')
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return status 500 if no profile is created - empty array', async () => {
    typeorm.onMock(ProfileEntity).toReturn([], 'save')
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return status 500 when an error occurs creating a profile', async () => {
    typeorm
      .onMock(ProfileEntity)
      .toReturn(
        new ResourceNotCreatedError('An error has occurred creating profile'),
        'save',
      )
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputInvalid)
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'username'",
        params: { missingProperty: 'username' },
        schemaPath: '#/required',
      },
    ])
  })
})
