// $10$xuelXfJ3lNqw7ZAasMYJvuHa51.KcK0FYsfF6fG3Y.iA0DtzSJme2
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.protectAdmin = (req, res, next) => {
  // console.log(process.env.JWT_SECRET)
  // console.log('header---',req.header)
  // console.log("Authorization Header:", req.headers.authorization)
  try{
    const authHeader =req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No tocken Provided" });
    }
    
    const token = authHeader.split(" ")[1].trim();
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin Only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invailid or expire token" });
  }
};
