import { Router } from "express";
import { login, logoutUser, me } from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, me);

export default router;
