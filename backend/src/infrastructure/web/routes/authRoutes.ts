import express from "express";
import { login, logout } from "../controllers/UserController";
import { registerAdvisor } from "../controllers/AdvisorController";
import { isAuth } from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerAdvisor);
router.post("/login", login);
router.get("/logout", isAuth, logout);

export default router;