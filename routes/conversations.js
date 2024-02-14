import { Router } from 'express'
import * as convoCtrl from '../controllers/conversations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, convoCtrl.allConvos)
router.get('/conversations/:conversationId', checkAuth, convoCtrl.showConvo)



export { router }