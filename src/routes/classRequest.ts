import express from 'express'

import { createClassRequestController } from '../controllers/classRequest'
import { getCreateClassRequestValidator } from '../middlewares/validators/classRequest'

const router = express.Router()
router.use(express.json())

router.post(
  '/classRequest',
  getCreateClassRequestValidator,
  createClassRequestController,
)

export default router
