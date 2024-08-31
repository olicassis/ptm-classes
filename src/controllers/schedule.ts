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
  console.info('[createScheduleController] Called createScheduleController')
  try {
    const input = req.body as CreateScheduleRequest
    const inputDate = new Date(input.date)

    if (inputDate < new Date()) {
      res.status(403).json({ message: 'A schedule date must be in the future' })
      return
    }

    const profile = await fetchProfileById(input.profileId)

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }

    if (profile?.role !== ProfileRole.TEACHER) {
      res.status(403).json({ message: 'Profile must have TEACHER role' })
      return
    }

    const existingSchedules = await fetchNonExpiredProfileSchedules(
      input.profileId,
    )

    if (checkDateOverlapping(input.date, existingSchedules)) {
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

    res.status(200).json({
      message: 'Schedule',
      data: schedule[0],
    })
  } catch (err) {
    console.error('[createScheduleController] Error:', err)
    res.status(500).json({ message: 'Could not create schedule' })
  }
}
