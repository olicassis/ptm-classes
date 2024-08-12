import express from 'express'

import { fetchAllProfilesController } from '../controllers/profile'

const router = express.Router()
router.use(express.json())

router.get('/profiles', fetchAllProfilesController)

export default router
