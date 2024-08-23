import express from 'express'

import { createSubjectController } from '../controllers/subject'
import { getCreateSubjectValidator } from '../middlewares/validators/subject'

const router = express.Router()
router.use(express.json())

router.post('/subject', getCreateSubjectValidator, createSubjectController)

export default router
