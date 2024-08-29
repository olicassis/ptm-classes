import { describe, test } from '@jest/globals'
import { MockTypeORM } from 'mock-typeorm'
import request from 'supertest'

import app from '../app'
import { ProfileEntity } from '../db/entity/Profile'
import { ProfileSubjectEntity } from '../db/entity/ProfileSubject'

import { mockedProfiles } from './mocks/profile.mock'
import {
  mockedCreateProfileSubjectInputInvalid,
  mockedCreateProfileSubjectInputValid,
  mockedProfileSubject,
} from './mocks/subject.mock'

describe('Post Subject Test Suite', () => {
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

  test('Should return status 200 for a successful call to post subject', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[1], 'findOneBy')
    typeorm
      .onMock(ProfileSubjectEntity)
      .toReturn([mockedProfileSubject], 'save')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toEqual(mockedProfileSubject)
    expect(response.status).toEqual(200)
  })

  test('Should return status 404 for a non existing profile', async () => {
    typeorm.onMock(ProfileEntity).toReturn(null, 'findOneBy')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(404)
  })

  test('Should return status 403 if profile is not a teacher profile', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[0], 'findOneBy')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(403)
  })

  test('Should return status 500 when an error occurs creating a subject', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[1], 'findOneBy')
    typeorm
      .onMock(ProfileSubjectEntity)
      .toReturn(new Error('An error has occurred creating subject'), 'save')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return status 500 when no subject is created - null', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[1], 'findOneBy')
    typeorm.onMock(ProfileSubjectEntity).toReturn(null, 'save')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return status 500 when no subject is created - null', async () => {
    typeorm.onMock(ProfileEntity).toReturn(mockedProfiles[1], 'findOneBy')
    typeorm.onMock(ProfileSubjectEntity).toReturn([], 'save')
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputInvalid)
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'profileId'",
        params: { missingProperty: 'profileId' },
        schemaPath: '#/required',
      },
    ])
  })
})
