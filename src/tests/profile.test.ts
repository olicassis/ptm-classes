import { describe, test, jest } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import {
  fetchAllProfiles,
  fetchProfileById,
  saveProfiles,
} from '../db/repository/profileRepository'
import { fetchProfileSchedulesByProfileIdWithRelations } from '../db/repository/scheduleRepository'
import { fetchProfileSubjectsByProfileId } from '../db/repository/subjectRepository'

import {
  mockedCreateProfileInputInvalid,
  mockedCreateProfileInputValid,
  mockedProfiles,
  mockedProfileSchedule,
  mockedProfileSubject,
} from './mocks/profile.mock'

jest.mock('../db/repository/profileRepository')

const mockedFetchAllProfiles = fetchAllProfiles as jest.MockedFunction<
  typeof fetchAllProfiles
>

const mockedSaveProfiles = saveProfiles as jest.MockedFunction<
  typeof saveProfiles
>

const mockedFetchProfileById = fetchProfileById as jest.MockedFunction<
  typeof fetchProfileById
>

jest.mock('../db/repository/subjectRepository')

const mockedFetchProfileSubjectsByProfileId =
  fetchProfileSubjectsByProfileId as jest.MockedFunction<
    typeof fetchProfileSubjectsByProfileId
  >

jest.mock('../db/repository/scheduleRepository')

const mockedFetchProfileSchedulesByProfileIdWithRelations =
  fetchProfileSchedulesByProfileIdWithRelations as jest.MockedFunction<
    typeof fetchProfileSchedulesByProfileIdWithRelations
  >

describe('Get Profiles Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to get profiles with existing profiles', async () => {
    mockedFetchAllProfiles.mockResolvedValueOnce(mockedProfiles)
    const response = await request(app).get('/api/profiles')
    expect(mockedFetchAllProfiles).toHaveBeenCalledTimes(1)
    expect(response.body.data).toEqual(mockedProfiles)
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profiles with no existing profiles', async () => {
    mockedFetchAllProfiles.mockResolvedValueOnce([])
    const response = await request(app).get('/api/profiles')
    expect(mockedFetchAllProfiles).toHaveBeenCalledTimes(1)
    expect(response.body.data.length).toEqual(0)
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs', async () => {
    mockedFetchAllProfiles.mockImplementationOnce(() => {
      throw new Error('An error has occurred')
    })
    const response = await request(app).get('/api/profiles')
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(500)
  })
})

describe('Get Profile By Id Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to get profile by id with existing profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[0].id}`,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledWith(mockedProfiles[0].id)
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toEqual(mockedProfiles[0])
    expect(response.status).toEqual(200)
  })

  test('Should return status 404 for a successful call to get profile by id with no existing profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(null)
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[0].id}`,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledWith(mockedProfiles[0].id)
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(404)
  })

  test('Should return status 500 when an error occurs', async () => {
    mockedFetchProfileById.mockImplementationOnce(() => {
      throw new Error('An error has occurred')
    })
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[0].id}`,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledWith(mockedProfiles[0].id)
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(500)
  })
})

describe('Get Profile Subjects By Profile Id Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to get profile with profile subjects', async () => {
    mockedFetchProfileSubjectsByProfileId.mockResolvedValueOnce([
      mockedProfileSubject,
    ])
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/subjects`,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledWith(
      mockedProfiles[1].id,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledTimes(1)
    expect(response.body.data).toEqual([mockedProfileSubject])
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profile with no profile subjects', async () => {
    mockedFetchProfileSubjectsByProfileId.mockResolvedValueOnce([])
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/subjects`,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledWith(
      mockedProfiles[1].id,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledTimes(1)
    expect(response.body.data.length).toEqual(0)
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs', async () => {
    mockedFetchProfileSubjectsByProfileId.mockImplementationOnce(() => {
      throw new Error('An error has occurred')
    })
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/subjects`,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledWith(
      mockedProfiles[1].id,
    )
    expect(mockedFetchProfileSubjectsByProfileId).toHaveBeenCalledTimes(1)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(500)
  })
})

describe('Get Profile Schedules By Profile Id Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    mockedFetchProfileSchedulesByProfileIdWithRelations.mockResolvedValueOnce([
      mockedProfileSchedule,
    ])
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/schedules`,
    )
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledWith(mockedProfiles[1].id, ['classRequest'])
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledTimes(1)
    expect(response.body.data).toEqual(plainMockedProfileSchedule)
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 200 for a successful call to get profile with no profile schedules', async () => {
    mockedFetchProfileSchedulesByProfileIdWithRelations.mockResolvedValueOnce(
      [],
    )
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/schedules`,
    )
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledWith(mockedProfiles[1].id, ['classRequest'])
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledTimes(1)
    expect(response.body.data.length).toEqual(0)
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 when an error occurs calling get profile schedules by profile id', async () => {
    mockedFetchProfileSchedulesByProfileIdWithRelations.mockImplementationOnce(
      () => {
        throw new Error('An error has occurred')
      },
    )
    const response = await request(app).get(
      `/api/profile/${mockedProfiles[1].id}/schedules`,
    )
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledWith(mockedProfiles[1].id, ['classRequest'])
    expect(
      mockedFetchProfileSchedulesByProfileIdWithRelations,
    ).toHaveBeenCalledTimes(1)
    expect(response.body.data).toBeUndefined()
    expect(response.body.message).toBeDefined()
    expect(response.status).toEqual(500)
  })
})

describe('Post Profile Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to post profile', async () => {
    mockedSaveProfiles.mockResolvedValueOnce([mockedProfiles[0]])
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(mockedSaveProfiles).toHaveBeenCalledWith([
      mockedCreateProfileInputValid,
    ])
    expect(mockedSaveProfiles).toHaveBeenCalledTimes(1)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toEqual(mockedProfiles[0])
    expect(response.status).toEqual(200)
  })

  test('Should return status 500 if no profile is created', async () => {
    mockedSaveProfiles.mockResolvedValueOnce([])
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(mockedSaveProfiles).toHaveBeenCalledWith([
      mockedCreateProfileInputValid,
    ])
    expect(mockedSaveProfiles).toHaveBeenCalledTimes(1)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return status 500 when an error occurs', async () => {
    mockedSaveProfiles.mockImplementationOnce(() => {
      throw new Error('An error has occurred')
    })
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputValid)
    expect(mockedSaveProfiles).toHaveBeenCalledWith([
      mockedCreateProfileInputValid,
    ])
    expect(mockedSaveProfiles).toHaveBeenCalledTimes(1)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
    expect(response.status).toEqual(500)
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/profile')
      .send(mockedCreateProfileInputInvalid)
    expect(mockedSaveProfiles).not.toHaveBeenCalled()
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
