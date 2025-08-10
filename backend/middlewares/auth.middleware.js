import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function protectRoute(req, res, next) {
    const token = req.cookies.AuthCookie;
    if(!token) {
        return res.status(400).json({
            status: 400,
            message: "Cookie not found"
        })
    }
    const key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, key);
    if(!decoded) {
        return res.status(404).json({
            status: 404,
            message: "Unauthorized access"
        })
    }
    req.user = decoded;
    next();
}