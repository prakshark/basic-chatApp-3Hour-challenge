import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

dotenv.config();

export async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({
        status: 400,
        message: "username already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    // jwt handling
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ username: username }, key, { expiresIn: "5h" });
    res.cookie("AuthCookie", token, {
      httpOnly: true,
      secure: true, // Secure for cross-origin
      sameSite: "none", // Required for cross-origin
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(201).json({
      status: 201,
      message: "New user registered",
      userInfo: newUser,
      cookie: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error while registering",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "username does not exists",
    });
  }
  const hashedPassword = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      status: 400,
      message: "Incorrect password provided",
    });
  }
  // jwt handling
  const key = process.env.SECRET_KEY;
  const token = jwt.sign({ username: username }, key, { expiresIn: "5h" });
  res.cookie("AuthCookie", token, {
    // httpOnly: true,
    httpOnly: true,
    secure: true, // Secure for cross-origin
    sameSite: "none", // Required for cross-origin
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return res.status(201).json({
    status: 201,
    message: "user logged in",
    cookie: token,
  });
}

export async function logoutUser(req, res) {
  res.clearCookie("AuthCookie");
  return res.status(200).json({
    status: 200,
    message: "user logged out and cookie deleted",
  });
}

export async function getAllUsers(req, res) {
  const result = await User.find({});
  const currUser = req.user;
  const finalResult = result.filter((x) => {
    if (x.username.toString() !== currUser.username.toString()) return true;
    else return false;
  });
  return res.status(200).json({
    status: 200,
    data: finalResult,
  });
}

export async function getUsername(req, res) {
  try {
    const currUser = req.user;
    return res.status(200).json({
      username: currUser.username.toString()
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error"
    });
  }
}
