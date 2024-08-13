import express from 'express'

import {
  fetchAllProfilesController,
  fetchProfileByIdController,
  fetchProfileSubjectsController,
} from '../controllers/profile'

const router = express.Router()
router.use(express.json())

router.get('/profiles', fetchAllProfilesController)
router.get('/profile/:id', fetchProfileByIdController)
router.get('/profile/:id/subjects', fetchProfileSubjectsController)

export default router
