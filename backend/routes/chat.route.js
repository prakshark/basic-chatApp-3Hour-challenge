import express from "express";
import { addChat, getChats } from "../controllers/chat.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/chats", protectRoute, addChat);
router.post("/chatroom", protectRoute, getChats);

export default router;