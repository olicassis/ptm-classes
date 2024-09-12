import { Request, Response } from 'express'

import { saveClassRequests } from '../db/repository/classRequestRepository'
import { fetchProfileById } from '../db/repository/profileRepository'
import { updateProfileScheduleStatus } from '../db/repository/scheduleRepository'
import { ProfileRole, ProfileScheduleStatus } from '../enums/profile'
import {
  ResourceNotCreatedError,
  ResourceNotUpdatedError,
} from '../errors/database.errors'
import { CreateClassRequestRequest } from '../middlewares/validators/classRequest'

export async function createClassRequestController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['ClassRequest']
    #swagger.summary = 'Create a new class request'
    #swagger.description = 'This endpoint will create a new class request for a given profile schedule and update the profile schedule status to UNAVAILABLE.'
  */
  console.info(
    '[createClassRequestController] Called createClassRequestController',
  )
  try {
    /*  #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
                $ref: "#/components/schemas/createClassRequestBody"
            }  
          }
        }
      } 
    */
    const input = req.body as CreateClassRequestRequest
    const profile = await fetchProfileById(input.studentProfileId)

    if (!profile) {
      /*  #swagger.responses[404] = {
        description: "Profile not found",
        content: {
          "application/json": {
            schema:{
                $ref: "#/components/schemas/createClassRequestProfileNotFoundResponse"
            }
          }           
        }
      }   
    */
      res.status(404).json({ message: 'Profile not found' })
      return
    }

    if (profile?.role !== ProfileRole.STUDENT) {
      /*  #swagger.responses[403] = {
        description: "Profile is not a STUDENT profile",
        content: {
          "application/json": {
            schema:{
                $ref: "#/components/schemas/createClassRequestNotStudentProfileResponse"
            }
          }           
        }
      }   
    */
      res.status(403).json({ message: 'Profile must have STUDENT role' })
      return
    }

    const classRequest = await saveClassRequests([
      {
        studentProfileId: input.studentProfileId,
        profileScheduleId: input.profileScheduleId,
      },
    ])

    if (classRequest.length === 0) {
      throw new ResourceNotCreatedError(
        `Could not create class request: ${input}`,
      )
    }

    const updateResult = await updateProfileScheduleStatus(
      classRequest[0].profileScheduleId,
      ProfileScheduleStatus.UNAVAILABLE,
    )

    if (updateResult?.status !== ProfileScheduleStatus.UNAVAILABLE) {
      throw new ResourceNotUpdatedError(
        `Could not update profile schedule status: ${input.profileScheduleId}`,
      )
    }

    /*  #swagger.responses[201] = {
        description: "Successfully created a class request",
        content: {
          "application/json": {
            schema:{
                $ref: "#/components/schemas/createClassRequestSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(201).json({
      message: 'Class Request',
      data: classRequest[0],
    })
  } catch (err) {
    console.error('[createClassRequestController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not create class request",
        content: {
          "application/json": {
            schema:{
                $ref: "#/components/schemas/createClassRequestInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not create class request' })
  }
}
