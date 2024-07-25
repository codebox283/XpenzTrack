import { Router } from "express";
import { setCategory } from "../controller/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route('/setCategory').post(setCategory, verifyJWT)

export default router;