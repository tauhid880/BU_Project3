import express from "express";
import {
  updateTeacher,
  getAllTeachers,
  deleteTeacher,
  getAllUser,
} from "../Controllers/adminController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();
router.put(
  "/allteachers/:id",
  authenticate,
  restrict(["admin"]),
  updateTeacher
);
router.get("/allteachers", getAllTeachers);
router.delete("/:id", deleteTeacher);
router.get("/allusers", getAllUser);

export default router;
