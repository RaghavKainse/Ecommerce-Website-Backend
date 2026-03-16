const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// admin
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body)
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password are required" });
    }
    const [rows] = await pool.query("SELECT * FROM users WHERE email= ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invailid Credentials" });
    }
    const user = rows[0];
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invailid Credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    res.status(200).json({ message: "Admin Login Successfully", token });
  } catch (error) {
    next(error);
  }
};

// registerUser

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields require" });
    }

    const [existing] = await pool.query("SELECT * FROM users WHERE email= ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name,email,password,role) VALUES (?,?,?,'customer')`,
      [name, email, hashedPassword],
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// login user

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? ", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const user=rows[0]
    const match = await bcrypt.compare(password,user.password)
    if(!match){
      return res.status(401).json({
        message:"Invaid password"
      })
    }
    const token =jwt.sign(
      {id:user.id,
        role:user.role
      },
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    );
    res.json({
      token,user:{
        id:user.id,
        name:user.name,
        email:user.email
      }
    })
  } catch (error) {
    next(error);
  }
};
