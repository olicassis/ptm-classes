import { describe, test, jest } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import { fetchProfileById } from '../db/repository/profileRepository'
import { saveSubjects } from '../db/repository/subjectRepository'

import { mockedProfiles } from './mocks/profile.mock'
import {
  mockedCreateProfileSubjectInputInvalid,
  mockedCreateProfileSubjectInputValid,
  mockedProfileSubject,
} from './mocks/subject.mock'

jest.mock('../db/repository/profileRepository')

const mockedFetchProfileById = fetchProfileById as jest.MockedFunction<
  typeof fetchProfileById
>

jest.mock('../db/repository/subjectRepository')

const mockedSaveSubjects = saveSubjects as jest.MockedFunction<
  typeof saveSubjects
>

describe('Post Subject Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to post subject', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedSaveSubjects.mockResolvedValueOnce([mockedProfileSubject])
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileSubjectInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveSubjects).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileSubjectInputValid.profileId,
        label: mockedCreateProfileSubjectInputValid.label.toLowerCase(),
      },
    ])
    expect(mockedSaveSubjects).toHaveBeenCalledTimes(1)
    expect(response.body.data).toMatchObject(mockedProfileSubject)
    expect(response.status).toEqual(200)
    expect(response.body.message).toBeDefined()
  })

  test('Should return status 404 for a non existing profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(null)
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileSubjectInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveSubjects).not.toHaveBeenCalled()
    expect(response.status).toEqual(404)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
  })

  test('Should return status 403 if profile is not a teacher profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileSubjectInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveSubjects).not.toHaveBeenCalled()
    expect(response.status).toEqual(403)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
  })

  test('Should return status 500 when an error occurs', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedSaveSubjects.mockImplementationOnce(() => {
      throw new Error('An error has occurred creating subject')
    })
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileSubjectInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveSubjects).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileSubjectInputValid.profileId,
        label: mockedCreateProfileSubjectInputValid.label.toLowerCase(),
      },
    ])
    expect(mockedSaveSubjects).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
  })

  test('Should return status 500 if no subject is created for a valid input', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedSaveSubjects.mockResolvedValueOnce([])
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileSubjectInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveSubjects).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileSubjectInputValid.profileId,
        label: mockedCreateProfileSubjectInputValid.label.toLowerCase(),
      },
    ])
    expect(mockedSaveSubjects).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/subject')
      .send(mockedCreateProfileSubjectInputInvalid)
    expect(mockedFetchProfileById).not.toHaveBeenCalled()
    expect(mockedSaveSubjects).not.toHaveBeenCalled()
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
