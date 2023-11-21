import express from "express";
import { getOneUser } from "../controllers/userController.js";

const router = express.Router()

router.get("/:id", getOneUser)
export default router;