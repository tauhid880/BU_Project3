import Teacher from "../models/TeacherSchema.js";
import User from "../models/UserSchema.js";

export const getAllTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find({})
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Teachers found",
      data: teacher,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Teachers not found",
    });
  }
};

export const updateTeacher = async (req, res) => {
  const id = req.params.id;
  const isApproved = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: isApproved },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Approved",
      data: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Approved",
    });
  }
};

export const deleteTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }
};
