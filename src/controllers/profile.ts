import { Request, Response } from 'express'

import { ProfileEntity } from '../db/entity/Profile'
import {
  fetchAllProfiles,
  fetchProfileById,
  saveProfiles,
} from '../db/repository/profileRepository'
import { fetchProfileSchedulesByProfileIdWithRelations } from '../db/repository/scheduleRepository'
import { fetchProfileSubjectsByProfileId } from '../db/repository/subjectRepository'
import { ResourceNotCreatedError } from '../errors/database.errors'

export async function fetchAllProfilesController(
  _req: Request,
  res: Response,
): Promise<void> {
  console.info('[fetchAllProfilesController] Called fetchAllProfilesController')
  try {
    const profiles = await fetchAllProfiles()
    res.status(200).json({
      message: 'Profiles',
      data: profiles,
    })
  } catch (err) {
    console.error('[fetchAllProfilesController] Error:', err)
    res.status(500).json({ message: 'Could not get profiles' })
  }
}

export async function fetchProfileByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  console.info('[fetchProfileByIdController] Called fetchProfileByIdController')
  try {
    const profileId = req.params.id
    const profile = await fetchProfileById(profileId)
    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }
    res.status(200).json({
      message: 'Profile',
      data: profile,
    })
  } catch (err) {
    console.error('[fetchProfileByIdController] Error:', err)
    res.status(500).json({ message: 'Could not get profile' })
  }
}

export async function fetchProfileSubjectsController(
  req: Request,
  res: Response,
): Promise<void> {
  console.info(
    '[fetchProfileSubjectsController] Called fetchProfileSubjectsController',
  )
  try {
    const profileId = req.params.id
    const profileSubjects = await fetchProfileSubjectsByProfileId(profileId)
    res.status(200).json({
      message: 'Profile Subjects',
      data: profileSubjects,
    })
  } catch (err) {
    console.error('[fetchProfileSubjectsController] Error:', err)
    res.status(500).json({ message: 'Could not get profile subjects' })
  }
}

export async function fetchProfileSchedulesController(
  req: Request,
  res: Response,
): Promise<void> {
  console.info(
    '[fetchProfileSchedulesController] Called fetchProfileSchedulesController',
  )
  try {
    const profileId = req.params.id
    const profileSubjects = await fetchProfileSchedulesByProfileIdWithRelations(
      profileId,
      ['classRequest'],
    )
    res.status(200).json({
      message: 'Profile Subjects',
      data: profileSubjects,
    })
  } catch (err) {
    console.error('[fetchProfileSchedulesController] Error:', err)
    res.status(500).json({ message: 'Could not get profile schedules' })
  }
}

export async function createProfilesController(
  req: Request,
  res: Response,
): Promise<void> {
  console.info('[createProfilesController] Called createProfilesController')
  try {
    const input = req.body as Partial<ProfileEntity>
    const profile = await saveProfiles([input])

    if (!profile || profile.length === 0) {
      throw new ResourceNotCreatedError(`Could not create profile: ${input}`)
    }

    res.status(200).json({
      message: 'Profile',
      data: profile[0],
    })
  } catch (err) {
    console.error('[createProfilesController] Error:', err)
    res.status(500).json({ message: 'Could not create profile' })
  }
}
