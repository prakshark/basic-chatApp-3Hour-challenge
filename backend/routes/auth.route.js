import express from "express";
import {getAllUsers, getUsername, loginUser, logoutUser, registerUser} from "../controllers/auth.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/allusers", protectRoute, getAllUsers);
router.get("/getusername", protectRoute, getUsername)

export default router;