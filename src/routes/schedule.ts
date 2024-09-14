import express from 'express'

import { createScheduleController } from '../controllers/schedule'
import { getCreateScheduleValidator } from '../middlewares/validators/schedule'

const router = express.Router()
router.use(express.json())

router.post('/schedule', getCreateScheduleValidator, createScheduleController)

export default router
