import {Router} from 'express'
import {loginUser, registerUser, logoutUser, updateProfileDeatils} from '../controller/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewares.js'
const router = Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

router.route('/logout').get(verifyJWT, logoutUser)
router.route('/update-details').patch(verifyJWT, updateProfileDeatils)
// router.route('/get-expenses').get(verifyJWT, getAllExpenseTrack)

export default router