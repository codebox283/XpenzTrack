import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { setGoal, EditGoal } from "../controller/savings.controller.js";
const router = Router()

router.route('/set-goal').post(setGoal, verifyJWT)
router.route("/update-goal/:id").patch(EditGoal, verifyJWT);

export default router
