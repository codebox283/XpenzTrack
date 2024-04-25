import {Router} from 'express'
import {registerUser} from '../controller/user.controller.js'
const router = Router()

router.route('/register').post(registerUser)
// router.post('/register', (req, res) => {
//     console.log('in register')
//     console.log(req.body)
// })

export default router