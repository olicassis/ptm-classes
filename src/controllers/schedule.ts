import { Request, Response } from 'express'

import { fetchProfileById } from '../db/repository/profileRepository'
import {
  fetchNonExpiredProfileSchedules,
  saveSchedules,
} from '../db/repository/scheduleRepository'
import { ProfileRole } from '../enums/profile'
import { ResourceNotCreatedError } from '../errors/database.errors'
import { CreateScheduleRequest } from '../middlewares/validators/schedule'
import { checkDateOverlapping } from '../utils/schedule'

export async function createScheduleController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['ProfileSchedule']
    #swagger.summary = 'Create a new profile schedule'
    #swagger.description = 'This endpoint will create a new profile schedule for a given profile.'
  */
  console.info('[createScheduleController] Called createScheduleController')
  try {
    /*  #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/createScheduleRequestBody"
            }  
          }
        }
      } 
    */
    const input = req.body as CreateScheduleRequest
    const inputDate = new Date(input.date)

    if (inputDate < new Date()) {
      /*  #swagger.responses[403] = {
        description: "A schedule date must be in the future",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/scheduleDateMustBeInTheFutureResponse"
            }
          }           
        }
      }   
    */
      res.status(403).json({ message: 'A schedule date must be in the future' })
      return
    }

    const profile = await fetchProfileById(input.profileId)

    if (!profile) {
      /*  #swagger.responses[404] = {
        description: "Profile not found",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/profileNotFoundResponse"
            }
          }           
        }
      }   
    */
      res.status(404).json({ message: 'Profile not found' })
      return
    }

    if (profile?.role !== ProfileRole.TEACHER) {
      /*  #swagger.responses[403] = {
        description: "Profile is not a TEACHER profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/notTeacherProfileResponse"
            }
          }           
        }
      }   
    */
      res.status(403).json({ message: 'Profile must have TEACHER role' })
      return
    }

    const existingSchedules = await fetchNonExpiredProfileSchedules(
      input.profileId,
    )

    if (checkDateOverlapping(input.date, existingSchedules)) {
      /*  #swagger.responses[403] = {
        description: "A schedule date can't overlap",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/overlappingSchedulesResponse"
            }
          }           
        }
      }   
    */
      res.status(403).json({
        message:
          'Could not create schedule! Provided date overlaps with existing schedules',
      })
      return
    }

    const schedule = await saveSchedules([
      {
        profileId: input.profileId,
        date: new Date(input.date),
      },
    ])

    if (schedule.length === 0) {
      throw new ResourceNotCreatedError(`Could not create schedule: ${input}`)
    }

    /*  #swagger.responses[201] = {
        description: "Successfully created a profile schedule",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileScheduleSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(201).json({
      message: 'Schedule',
      data: schedule[0],
    })
  } catch (err) {
    console.error('[createScheduleController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not create profile schedule",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileScheduleInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not create schedule' })
  }
}
