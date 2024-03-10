import User from "../models/UserSchema.js";
import Teacher from "../models/TeacherSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

// export const register = async (req, res) => {
//   const { email, password, name, id, photo, role } = req.body;
//   console.log(id);
//   try {
//     let user = null;
//     if (role == "student" || role == "admin") {
//       user = await User.findOne({ email });
//     } else if (role == "teacher") {
//       user = await Teacher.findOne({ email });
//     }

//     // Check if user exist

//     if (user) {
//       return res.status(400).json({ message: "User already exist" });
//     }

//     //  Hash password

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     if (role == "student") {
//       user = new User({
//         name,
//         role,
//         email,
//         password: hashPassword,
//         id,
//         photo,
//       });
//     }

//     if (role == "teacher") {
//       user = new Teacher({
//         name,
//         role,
//         email,
//         password: hashPassword,
//         id,
//         photo,
//       });
//     }

//     await user.save();
//     res
//       .status(200)
//       .json({ success: true, message: "User successfully created" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const register = async (req, res) => {
  const { email, password, name, id, photo, role } = req.body;

  try {
    let user = null;

    // Check if the email already exists in the database
    if (role === "student" || role === "admin") {
      user = await User.findOne({ email });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ email });
    }

    // Check if the user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if the ID already exists
    if (role === "student") {
      const existingUserWithId = await User.findOne({ id });
      if (existingUserWithId) {
        return res.status(400).json({ message: "ID already exists" });
      }
    } else if (role === "teacher") {
      const existingTeacherWithId = await Teacher.findOne({ id });
      if (existingTeacherWithId) {
        return res.status(400).json({ message: "ID already exists" });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user based on role
    if (role === "student") {
      user = new User({
        name,
        role,
        email,
        password: hashPassword,
        id,
        photo,
      });
    } else if (role === "teacher") {
      user = new Teacher({
        name,
        role,
        email,
        password: hashPassword,
        id,
        photo,
      });
    }

    // Save user to the database
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const student = await User.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (student) {
      user = student;
    }
    if (teacher) {
      user = teacher;
    }

    // Check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compere password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid password " });
    }

    // Get token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully Login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login " });
  }
};

// export const login = async (req, res) => {
//   const { email } = req.body;
//   try {
//     let user = null;
//     const student = await User.findOne({ email });
//     const teacher = await Teacher.findOne({ email });

//     if (student) {
//       user = student;
//     }
//     if (teacher) {
//       user = teacher;
//     }

//     // Check user exist or not

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Compere password
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordMatch) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Invalid password " });
//     }

//     // Get token
//     // const token = generateToken(user);

//     const { password, role, appointments, ...rest } = user._doc;
//     res.status(200).json({
//       success: true,
//       message: "Successfully Login",
//       token,
//       data: { ...rest },
//       role,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to login " });
//   }
// };
