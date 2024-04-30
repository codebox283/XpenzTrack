import {Router} from 'express'
import {loginUser, registerUser, logoutUser, updatePassword, forgotPassword} from '../controller/user.controller.js'
import {loginUser, registerUser, logoutUser, updateProfileDeatils} from '../controller/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewares.js'
const router = Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

router.route('/logout').get(verifyJWT, logoutUser)
router.route('/changePassword').patch(verifyJWT, updatePassword)
router.route('/forgotPassword').patch(forgotPassword)
router.route('/update-details').patch(verifyJWT, updateProfileDeatils)
export default router