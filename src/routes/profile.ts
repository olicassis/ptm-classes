import express from 'express'

import {
  fetchAllProfilesController,
  fetchProfileByIdController,
  fetchProfileSubjectsController,
  fetchProfileSchedulesController,
  createProfileController,
} from '../controllers/profile'
import { getCreateProfileValidator } from '../middlewares/validators/profile'

const router = express.Router()
router.use(express.json())

router.get('/profiles', fetchAllProfilesController)
router.get('/profile/:id', fetchProfileByIdController)
router.get('/profile/:id/subjects', fetchProfileSubjectsController)
router.get('/profile/:id/schedules', fetchProfileSchedulesController)

router.post('/profile', getCreateProfileValidator, createProfileController)

export default router
