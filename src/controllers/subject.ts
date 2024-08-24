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
  console.info('[createSubjectController] Called createSubjectController')
  try {
    const input = req.body as CreateSubjectRequest
    const profile = await fetchProfileById(input.profileId)

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
      return
    }

    if (profile?.role !== ProfileRole.TEACHER) {
      res.status(403).json({ message: 'Profile must have TEACHER role' })
      return
    }

    const subject = await saveSubjects([
      {
        profileId: input.profileId,
        label: input.label.toLowerCase(),
      },
    ])

    if (!subject || subject.length === 0) {
      throw new ResourceNotCreatedError(`Could not create subject: ${input}`)
    }

    res.status(200).json({
      message: 'Subject',
      data: subject[0],
    })
  } catch (err) {
    console.error('[createSubjectController] Error:', err)
    res.status(500).json({ message: 'Could not create subject' })
  }
}
