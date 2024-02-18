import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import teacherRoute from "./Routes/teacher.js";
import bookingsRoute from "./Routes/bookings.js";
import adminRoute from "./Routes/admin.js";
import ServerlessHttp from "serverless-http";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB database is connected");
  } catch (error) {
    console.log("MongoDB database connection failed");
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/admin", adminRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port" + port);
});
