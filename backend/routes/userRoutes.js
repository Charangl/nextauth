import express from "express";
import { getOneUser, login, register } from "../controllers/userController.js";

const router = express.Router()

router.get("/:id", getOneUser)

router.post("/register", register)

router.post("/login", login)

export default router;