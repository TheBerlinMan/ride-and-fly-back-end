import { Router } from 'express'
import * as tripsCtrl from '../controllers/trips.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/trips', checkAuth, tripsCtrl.create)
router.get('/trips', checkAuth, tripsCtrl.index)
router.get('/trips/:tripId', checkAuth, tripsCtrl.show)
router.put('/trips/:tripId', checkAuth, tripsCtrl.update)
router.delete('/trips/:tripId', checkAuth, tripsCtrl.delete)


export { router }