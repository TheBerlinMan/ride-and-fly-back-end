import { Router } from 'express'
import * as tripsCtrl from '../controllers/trips.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, tripsCtrl.create)
router.get('/', checkAuth, tripsCtrl.index)
router.patch('/complete-trip/:tripId', checkAuth, tripsCtrl.updateTripStatus)
router.get('/:tripId', checkAuth, tripsCtrl.show)
router.delete('/:tripId', checkAuth, tripsCtrl.delete)


export { router }