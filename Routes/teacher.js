import express from "express";
import {
  updateTeacher,
  deleteTeacher,
  getAllTeacher,
  getSingleTeacher,
  getTeacherProfile,
} from "../Controllers/teacherController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();
router.get("/:id", getSingleTeacher);
router.get("/", getAllTeacher);
router.put("/:id", authenticate, restrict(["teacher", "admin"]), updateTeacher);
router.delete("/:id", authenticate, restrict(["teacher"]), deleteTeacher);
router.get(
  "/profile/me",
  authenticate,
  restrict(["teacher"]),
  getTeacherProfile
);

export default router;
