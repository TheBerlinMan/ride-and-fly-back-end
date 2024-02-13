import { Router } from "express"
import * as reviewsCtrl from '../controllers/reviews.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()
pal
router.use(decodeUserFromToken)
router.post('/', checkAuth, reviewsCtrl.create)
router.get('/', checkAuth, reviewsCtrl.index)
router.get('/:reviewId', checkAuth, reviewsCtrl.show)