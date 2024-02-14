import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, postsCtrl.create)
router.post('/:postId/messages', checkAuth, postsCtrl.sendMessage)
router.get('/', checkAuth, postsCtrl.index)
router.get('/:postId', checkAuth, postsCtrl.show)
router.put('/:postId', checkAuth, postsCtrl.update)
router.delete('/:postId', checkAuth, postsCtrl.delete)


export { router }