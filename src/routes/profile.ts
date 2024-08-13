import express from 'express'

import {
  fetchAllProfilesController,
  fetchProfileByIdController,
} from '../controllers/profile'

const router = express.Router()
router.use(express.json())

router.get('/profiles', fetchAllProfilesController)
router.get('/profile/:id', fetchProfileByIdController)

export default router
