import jwt from "jsonwebtoken";
import Teacher from "../models/TeacherSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check token is exist
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const student = await User.findById(userId);
  const teacher = await Teacher.findById(userId);

  if (student) {
    user = student;
  }
  if (teacher) {
    user = teacher;
  }

  if (!roles.includes(user?.role)) {
    return res
      .status(401)
      .json({ success: false, message: "Your are not authorize" });
  }

  next();
};
