import { Request, Response } from 'express'

import { fetchProfileById } from '../db/repository/profileRepository'
import { saveSubjects } from '../db/repository/subjectRepository'
import { ProfileRole } from '../enums/profile'
import { ResourceNotCreatedError } from '../errors/database.errors'
import { CreateSubjectRequest } from '../middlewares/validators/subject'

export async function createSubjectController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['ProfileSubject']
    #swagger.summary = 'Create a new profile subject'
    #swagger.description = 'This endpoint will create a new profile subject for a given profile.'
  */
  console.info('[createSubjectController] Called createSubjectController')
  try {
    /*  #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/createSubjectRequestBody"
            }  
          }
        }
      } 
    */
    const input = req.body as CreateSubjectRequest
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

    const subject = await saveSubjects([
      {
        profileId: input.profileId,
        label: input.label.toLowerCase(),
      },
    ])

    if (subject.length === 0) {
      throw new ResourceNotCreatedError(`Could not create subject: ${input}`)
    }

    /*  #swagger.responses[201] = {
        description: "Successfully created a profile subject",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileSubjectSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(201).json({
      message: 'Subject',
      data: subject[0],
    })
  } catch (err) {
    console.error('[createSubjectController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not create profile subject",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileSubjectInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not create subject' })
  }
}
