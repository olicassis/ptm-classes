import { Request, Response } from 'express'

import { fetchAllProfiles } from '../db/repository/profileRepository'

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
