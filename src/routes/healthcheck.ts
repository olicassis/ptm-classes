import express from 'express'

import { healthcheck } from '../controllers/healthcheck'

const router = express.Router()
router.use(express.json())

router.get('/', healthcheck)
router.get('/healthcheck', healthcheck)

export default router
