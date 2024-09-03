import { describe, test, jest } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import { fetchProfileById } from '../db/repository/profileRepository'
import {
  fetchNonExpiredProfileSchedules,
  saveSchedules,
} from '../db/repository/scheduleRepository'
import { checkDateOverlapping } from '../utils/schedule'

import { mockedProfiles } from './mocks/profile.mock'
import {
  mockedCreateProfileScheduleInputPastDate,
  mockedCreateProfileScheduleInputInvalid,
  mockedCreateProfileScheduleInputValid,
  mockedNonOverlappingProfileSchedule,
  mockedOverlappingProfileSchedule,
  mockedProfileSchedule,
} from './mocks/schedule.mock'

jest.mock('../db/repository/profileRepository')

const mockedFetchProfileById = fetchProfileById as jest.MockedFunction<
  typeof fetchProfileById
>

jest.mock('../db/repository/scheduleRepository')

const mockedFetchNonExpiredProfileSchedules =
  fetchNonExpiredProfileSchedules as jest.MockedFunction<
    typeof fetchNonExpiredProfileSchedules
  >

const mockedSaveSchedules = saveSchedules as jest.MockedFunction<
  typeof saveSchedules
>

jest.mock('../utils/schedule')

const mockedCheckDateOverlapping = checkDateOverlapping as jest.MockedFunction<
  typeof checkDateOverlapping
>

describe('Post Schedule Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status 200 for a successful call to post schedule', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedFetchNonExpiredProfileSchedules.mockResolvedValueOnce([
      mockedNonOverlappingProfileSchedule,
    ])
    mockedCheckDateOverlapping.mockReturnValueOnce(false)
    mockedSaveSchedules.mockResolvedValueOnce([mockedProfileSchedule])
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledTimes(1)
    expect(mockedCheckDateOverlapping).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.date,
      [mockedNonOverlappingProfileSchedule],
    )
    expect(mockedCheckDateOverlapping).toHaveBeenCalledTimes(1)
    expect(mockedSaveSchedules).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileScheduleInputValid.profileId,
        date: new Date(mockedCreateProfileScheduleInputValid.date),
      },
    ])
    expect(mockedSaveSchedules).toHaveBeenCalledTimes(1)
    expect(response.body.data).toMatchObject({
      ...mockedProfileSchedule,
      date: mockedProfileSchedule.date.toISOString(),
    })
    expect(response.status).toEqual(200)
    expect(response.body.message).toBeDefined()
  })

  test('Should return status 403 for an input with a past date', async () => {
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputPastDate)
    expect(mockedFetchProfileById).not.toHaveBeenCalled()
    expect(mockedFetchNonExpiredProfileSchedules).not.toHaveBeenCalled()
    expect(mockedCheckDateOverlapping).not.toHaveBeenCalled()
    expect(mockedSaveSchedules).not.toHaveBeenCalled()
    expect(response.status).toEqual(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return 404 for a non existing profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(null)
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).not.toHaveBeenCalled()
    expect(mockedCheckDateOverlapping).not.toHaveBeenCalled()
    expect(mockedSaveSchedules).not.toHaveBeenCalled()
    expect(response.status).toEqual(404)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return 403 for a non teacher profile', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[0])
    const response = await request(app).post('/api/schedule').send({
      profileId: mockedProfiles[0].id,
      date: mockedCreateProfileScheduleInputValid.date,
    })
    expect(mockedFetchProfileById).toHaveBeenCalledWith(mockedProfiles[0].id)
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).not.toHaveBeenCalled()
    expect(mockedCheckDateOverlapping).not.toHaveBeenCalled()
    expect(mockedSaveSchedules).not.toHaveBeenCalled()
    expect(response.status).toEqual(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return 403 if provided schedule date overlaps with an existing one', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedFetchNonExpiredProfileSchedules.mockResolvedValueOnce([
      mockedOverlappingProfileSchedule,
    ])
    mockedCheckDateOverlapping.mockReturnValueOnce(true)
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledTimes(1)
    expect(mockedCheckDateOverlapping).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.date,
      [mockedOverlappingProfileSchedule],
    )
    expect(mockedCheckDateOverlapping).toHaveBeenCalledTimes(1)
    expect(mockedSaveSchedules).not.toHaveBeenCalled()
    expect(response.status).toEqual(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if no schedule is created for a valid input', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedFetchNonExpiredProfileSchedules.mockResolvedValueOnce([
      mockedNonOverlappingProfileSchedule,
    ])
    mockedCheckDateOverlapping.mockReturnValueOnce(false)
    mockedSaveSchedules.mockResolvedValueOnce([])
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledTimes(1)
    expect(mockedCheckDateOverlapping).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.date,
      [mockedNonOverlappingProfileSchedule],
    )
    expect(mockedCheckDateOverlapping).toHaveBeenCalledTimes(1)
    expect(mockedSaveSchedules).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileScheduleInputValid.profileId,
        date: new Date(mockedCreateProfileScheduleInputValid.date),
      },
    ])
    expect(mockedSaveSchedules).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return status 500 if an error occurs', async () => {
    mockedFetchProfileById.mockResolvedValueOnce(mockedProfiles[1])
    mockedFetchNonExpiredProfileSchedules.mockResolvedValueOnce([
      mockedNonOverlappingProfileSchedule,
    ])
    mockedCheckDateOverlapping.mockReturnValueOnce(false)
    mockedSaveSchedules.mockImplementationOnce(() => {
      throw new Error('An error occurred')
    })
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputValid)
    expect(mockedFetchProfileById).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchProfileById).toHaveBeenCalledTimes(1)
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.profileId,
    )
    expect(mockedFetchNonExpiredProfileSchedules).toHaveBeenCalledTimes(1)
    expect(mockedCheckDateOverlapping).toHaveBeenCalledWith(
      mockedCreateProfileScheduleInputValid.date,
      [mockedNonOverlappingProfileSchedule],
    )
    expect(mockedCheckDateOverlapping).toHaveBeenCalledTimes(1)
    expect(mockedSaveSchedules).toHaveBeenCalledWith([
      {
        profileId: mockedCreateProfileScheduleInputValid.profileId,
        date: new Date(mockedCreateProfileScheduleInputValid.date),
      },
    ])
    expect(mockedSaveSchedules).toHaveBeenCalledTimes(1)
    expect(response.status).toEqual(500)
    expect(response.body.message).toBeDefined()
    expect(response.body.data).toBeUndefined()
  })

  test('Should return a validation error if payload is invalid', async () => {
    const response = await request(app)
      .post('/api/schedule')
      .send(mockedCreateProfileScheduleInputInvalid)
    expect(mockedFetchProfileById).not.toHaveBeenCalled()
    expect(mockedFetchNonExpiredProfileSchedules).not.toHaveBeenCalled()
    expect(mockedCheckDateOverlapping).not.toHaveBeenCalled()
    expect(mockedSaveSchedules).not.toHaveBeenCalled()
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
