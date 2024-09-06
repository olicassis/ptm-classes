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
  console.info(
    '[createClassRequestController] Called createClassRequestController',
  )
  try {
    const input = req.body as CreateClassRequestRequest
    const profile = await fetchProfileById(input.studentProfileId)

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }

    if (profile?.role !== ProfileRole.STUDENT) {
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
        `Could not create class request: ${input}`,
      )
    }

    res.status(200).json({
      message: 'Class Request',
      data: classRequest[0],
    })
  } catch (err) {
    console.error('[createClassRequestController] Error:', err)
    res.status(500).json({ message: 'Could not create class request' })
  }
}
