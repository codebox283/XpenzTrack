import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { setGoal } from "../controller/savings.controller.js";
const router = Router()

router.route('/set-goal').post(setGoal, verifyJWT)

export default router
