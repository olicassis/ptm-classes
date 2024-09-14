import { Request, Response } from 'express'

import {
  fetchAllProfiles,
  fetchProfileById,
  saveProfiles,
  updateProfileStatus,
} from '../db/repository/profileRepository'
import { fetchProfileSchedulesByProfileIdWithRelations } from '../db/repository/scheduleRepository'
import { fetchProfileSubjectsByProfileId } from '../db/repository/subjectRepository'
import { ProfileStatus } from '../enums/profile'
import {
  ResourceNotCreatedError,
  ResourceNotUpdatedError,
} from '../errors/database.errors'
import { CreateProfileRequest } from '../middlewares/validators/profile'

export async function fetchAllProfilesController(
  _req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['Profiles']
    #swagger.summary = 'Get all profiles'
    #swagger.description = 'This endpoint gets all profiles.'
  */
  console.info('[fetchAllProfilesController] Called fetchAllProfilesController')
  try {
    const profiles = await fetchAllProfiles()
    /*  #swagger.responses[200] = {
        description: "Successfully got all profiles",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getAllProfilesSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(200).json({
      message: 'Profiles',
      data: profiles,
    })
  } catch (err) {
    console.error('[fetchAllProfilesController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not get profiles",
        content: {
          "application/json": {
            schema:{
                $ref: "#/components/schemas/getProfilesInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not get profiles' })
  }
}

export async function fetchProfileByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Get a profile'
    #swagger.description = 'This endpoint gets a profile by its id.'
  */
  console.info('[fetchProfileByIdController] Called fetchProfileByIdController')
  try {
    const profileId = req.params.id
    const profile = await fetchProfileById(profileId)
    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }
    /*  #swagger.responses[200] = {
        description: "Successfully got a profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getProfileSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(200).json({
      message: 'Profile',
      data: profile,
    })
  } catch (err) {
    console.error('[fetchProfileByIdController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not get profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getProfileInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not get profile' })
  }
}

export async function fetchProfileSubjectsController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['ProfileSubjects']
    #swagger.summary = 'Get all subjects for a given profile'
    #swagger.description = 'This endpoint gets all subjects for a given profile id.'
  */
  console.info(
    '[fetchProfileSubjectsController] Called fetchProfileSubjectsController',
  )
  try {
    const profileId = req.params.id
    const profileSubjects = await fetchProfileSubjectsByProfileId(profileId)
    /*  #swagger.responses[200] = {
        description: "Successfully got all profile subjects",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getAllProfileSubjectsSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(200).json({
      message: 'Profile Subjects',
      data: profileSubjects,
    })
  } catch (err) {
    console.error('[fetchProfileSubjectsController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not get profile subjects",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getProfileSubjectsInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not get profile subjects' })
  }
}

export async function fetchProfileSchedulesController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['ProfileSchedules']
    #swagger.summary = 'Get all schedules for a given profile'
    #swagger.description = 'This endpoint gets all schedules for a given profile id.'
  */
  console.info(
    '[fetchProfileSchedulesController] Called fetchProfileSchedulesController',
  )
  try {
    const profileId = req.params.id
    const profileSubjects = await fetchProfileSchedulesByProfileIdWithRelations(
      profileId,
      ['classRequest'],
    )
    /*  #swagger.responses[200] = {
        description: "Successfully got all profile schedules",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getAllProfileSchedulesSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(200).json({
      message: 'Profile Schedules',
      data: profileSubjects,
    })
  } catch (err) {
    console.error('[fetchProfileSchedulesController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not get profile schedules",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/getProfileSchedulesInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not get profile schedules' })
  }
}

export async function createProfileController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Create a new profile'
    #swagger.description = 'This endpoint will create a new profile.'
  */
  console.info('[createProfileController] Called createProfileController')
  try {
    /*  #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/createProfileRequestBody"
            }  
          }
        }
      } 
    */
    const input = req.body as CreateProfileRequest
    const profile = await saveProfiles([input])

    if (profile.length === 0) {
      throw new ResourceNotCreatedError(`Could not create profile: ${input}`)
    }
    /*  #swagger.responses[201] = {
        description: "Successfully created a profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(201).json({
      message: 'Profile',
      data: profile[0],
    })
  } catch (err) {
    console.error('[createProfileController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not create profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/createProfileInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Could not create profile' })
  }
}

export async function verifyProfileStatusController(
  req: Request,
  res: Response,
): Promise<void> {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Verify profile'
    #swagger.description = 'This endpoint updates profile status to VERIFIED.'
  */
  console.info(
    '[verifyProfileStatusController] Called verifyProfileStatusController',
  )
  try {
    const profileId = req.params.id as string
    const profile = await updateProfileStatus(profileId, ProfileStatus.VERIFIED)

    if (profile?.status !== ProfileStatus.VERIFIED) {
      throw new ResourceNotUpdatedError(
        `Could not update profile status: ${profileId}`,
      )
    }
    res.status(204).send()
  } catch (err) {
    console.error('[verifyProfileStatusController] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Could not verify profile",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/verifyProfileInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({
      message: 'Could not verify profile',
      data: {
        success: false,
      },
    })
  }
}
