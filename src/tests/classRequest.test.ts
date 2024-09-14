import { describe, test, jest } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import { saveClassRequests } from '../db/repository/classRequestRepository'
import { fetchProfileById } from '../db/repository/profileRepository'
import { updateProfileScheduleStatus } from '../db/repository/scheduleRepository'
import { ProfileScheduleStatus } from '../enums/profile'

import {
  mockedClassRequest,
  mockedCreateClassRequestInputInvalid,
  mockedCreateClassRequestInputValid,
} from './mocks/classRequest.mock'
import { mockedProfiles } from './mocks/profile.mock'
import { mockedProfileSchedule } from './mocks/schedule.mock'

jest.mock('../db/repository/profileRepository')

const mockedFetchProfileById = fetchProfileById as jest.MockedFunction<
  typeof fetchProfileById
>

jest.mock('../db/repository/classRequestRepository')

const mockedSaveClassRequests = saveClassRequests as jest.MockedFunction<
  typeof saveClassRequests
>

jest.mock('../db/repository/scheduleRepository')

const mockedUpdateProfileScheduleStatus =
  updateProfileScheduleStatus as jest.MockedFunction<
    typeof updateProfileScheduleStatus
  >

describe('Post Class Request Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 201 for a successful call to post classRequest', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    mockedSaveClassRequests.mockResolvedValueOnce([mockedClassRequest])
    mockedUpdateProfileScheduleStatus.mockResolvedValueOnce({
      ...mockedProfileSchedule,
      status: ProfileScheduleStatus.UNAVAILABLE,
    })
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).toHaveBeenCalledWith([
      {
        studentProfileId: mockedCreateClassRequestInputValid.studentProfileId,
        profileScheduleId: mockedCreateClassRequestInputValid.profileScheduleId,
      },
    ])
    expect(mockedSaveClassRequests).toHaveBeenCalledTimes(1)
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.profileScheduleId,
      ProfileScheduleStatus.UNAVAILABLE,
    )
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledTimes(1)
    expect(response.body.data).toMatchObject(mockedClassRequest)
    expect(response.status).toEqual(201)
    expect(response.body.message).toBeDefined()
  })

  test('Should return 404 for a non existing profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(null)
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).not.toHaveBeenCalled()
    expect(mockedUpdateProfileScheduleStatus).not.toHaveBeenCalled()
    expect(response.status).toEqual(404)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return 403 for a non student profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).not.toHaveBeenCalled()
    expect(mockedUpdateProfileScheduleStatus).not.toHaveBeenCalled()
    expect(response.status).toEqual(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if no class request is created for a valid input', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    mockedSaveClassRequests.mockResolvedValueOnce([])
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).toHaveBeenCalledWith([
      {
        studentProfileId: mockedCreateClassRequestInputValid.studentProfileId,
        profileScheduleId: mockedCreateClassRequestInputValid.profileScheduleId,
      },
    ])
    expect(mockedSaveClassRequests).toHaveBeenCalledTimes(1)
    expect(mockedUpdateProfileScheduleStatus).not.toHaveBeenCalled()
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if profile schedule status could not be updated', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    mockedSaveClassRequests.mockResolvedValueOnce([mockedClassRequest])
    mockedUpdateProfileScheduleStatus.mockResolvedValueOnce(null)
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).toHaveBeenCalledWith([
      {
        studentProfileId: mockedCreateClassRequestInputValid.studentProfileId,
        profileScheduleId: mockedCreateClassRequestInputValid.profileScheduleId,
      },
    ])
    expect(mockedSaveClassRequests).toHaveBeenCalledTimes(1)
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.profileScheduleId,
      ProfileScheduleStatus.UNAVAILABLE,
    )
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if profile schedule status could not be updated - status available', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    mockedSaveClassRequests.mockResolvedValueOnce([mockedClassRequest])
    mockedUpdateProfileScheduleStatus.mockResolvedValueOnce(
      mockedProfileSchedule,
    )
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).toHaveBeenCalledWith([
      {
        studentProfileId: mockedCreateClassRequestInputValid.studentProfileId,
        profileScheduleId: mockedCreateClassRequestInputValid.profileScheduleId,
      },
    ])
    expect(mockedSaveClassRequests).toHaveBeenCalledTimes(1)
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.profileScheduleId,
      ProfileScheduleStatus.UNAVAILABLE,
    )
    expect(mockedUpdateProfileScheduleStatus).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if an error occurs', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    mockedSaveClassRequests.mockImplementationOnce(() => {
      throw new Error('An error occurred')
    })
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateClassRequestInputValid.studentProfileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedSaveClassRequests).toHaveBeenCalledWith([
      {
        studentProfileId: mockedCreateClassRequestInputValid.studentProfileId,
        profileScheduleId: mockedCreateClassRequestInputValid.profileScheduleId,
      },
    ])
    expect(mockedSaveClassRequests).toHaveBeenCalledTimes(1)
    expect(mockedUpdateProfileScheduleStatus).not.toHaveBeenCalled()
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/classRequest')
      .send(mockedCreateClassRequestInputInvalid)
    expect(mockedFetchProfileById).not.toHaveBeenCalled()
    expect(mockedSaveClassRequests).not.toHaveBeenCalled()
    expect(mockedUpdateProfileScheduleStatus).not.toHaveBeenCalled()
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'profileScheduleId'",
        params: { missingProperty: 'profileScheduleId' },
        schemaPath: '#/required',
      },
    ])
  })
})
