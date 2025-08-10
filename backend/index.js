import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; "cookie-parser";

import { connectDB } from "./db/db.js";

import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Request method:', req.method);
  
  // Allow requests from Vercel frontend
  const allowedOrigins = [
    'http://localhost:5000', // For local development
    'http://localhost:5173'  // Vite dev server
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    res.status(200).end();
    return;
  }
  
  // Handle actual requests
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  
  next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes :-
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

// Server start :-
const port = process.env.PORT;
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    })
})
.catch((err) => {
    console.log(`Error initialising the server: ${err.message}`);
})