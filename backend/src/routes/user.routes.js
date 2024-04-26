import {Router} from 'express'
import {loginUser, registerUser} from '../controller/user.controller.js'
const router = Router()

router.route('/register').post(registerUser)
// router.post('/register', (req, res) => {
//     console.log('in register')
//     console.log(req.body)
// })

router.route("/login").post(loginUser)

export default router