import express from 'express'

import {
  fetchAllProfilesController,
  fetchProfileByIdController,
  fetchProfileSubjectsController,
  fetchProfileSchedulesController,
  createProfileController,
  verifyProfileStatusController,
} from '../controllers/profile'
import { getCreateProfileValidator } from '../middlewares/validators/profile'

const router = express.Router()
router.use(express.json())

router.get('/profiles', fetchAllProfilesController)
router.get('/profile/:id', fetchProfileByIdController)
router.get('/profile/:id/subjects', fetchProfileSubjectsController)
router.get('/profile/:id/schedules', fetchProfileSchedulesController)

router.post('/profile', getCreateProfileValidator, createProfileController)
router.patch('/profile/:id/status/verified', verifyProfileStatusController)

export default router
