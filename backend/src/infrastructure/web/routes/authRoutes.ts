import express from "express";
import { registerAdvisor, login, logout } from "../controllers/AuthController";
import { isAuth } from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerAdvisor);
router.post("/login", login);
router.get("/logout", isAuth, logout);

export default router;