import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { setGoal, EditGoal, DeleteGoal } from "../controller/savings.controller.js";
const router = Router()

router.route('/set-goal').post(setGoal, verifyJWT)
router.route("/update-goal/:id").patch(EditGoal, verifyJWT);
router.route('/delete-goal/:id').post(DeleteGoal, verifyJWT);

export default router
