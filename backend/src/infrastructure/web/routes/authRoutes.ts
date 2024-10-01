import express from "express";
import { register, login, logout } from "../controllers/UserController";
import { isAuth } from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuth, logout);

export default router;