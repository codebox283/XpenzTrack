import {Router} from 'express'
<<<<<<< HEAD
import {loginUser, registerUser, logoutUser, updatePassword, forgotPassword} from '../controller/user.controller.js'
=======
import {loginUser, registerUser, logoutUser, updateProfileDeatils} from '../controller/user.controller.js'
>>>>>>> a60ba751295359e2db30502728437fd752533325
import { verifyJWT } from '../middlewares/auth.middlewares.js'
const router = Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

router.route('/logout').get(verifyJWT, logoutUser)
<<<<<<< HEAD
router.route('/changePassword').patch(verifyJWT, updatePassword)
router.route('/forgotPassword').patch(forgotPassword)
=======
router.route('/update-details').patch(verifyJWT, updateProfileDeatils)

>>>>>>> a60ba751295359e2db30502728437fd752533325
export default router