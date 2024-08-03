import { Router } from "express";
import { deleteExpense, setCategory } from "../controller/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route('/setCategory').post(setCategory, verifyJWT)
router.route('/delete-expense/:id').get(deleteExpense, verifyJWT)

export default router;