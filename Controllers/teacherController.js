import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import Teacher from "../models/TeacherSchema.js";

export const updateTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
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

export const getSingleTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: teacher,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const { query } = req.query;
    let teachers;
    if (query) {
      teachers = await Teacher.find({
        isApproved: "approved",
        $or: [{ name: { $regex: query, $options: "i" } }],
      }).select("-password");
    } else {
      teachers = await Teacher.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Teachers found",
      data: teachers,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Teachers not found",
    });
  }
};

export const getTeacherProfile = async (req, res) => {
  const teacherId = req.userId;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }
    const { password, ...rest } = teacher._doc;
    const appointments = await Booking.find({ teacher: teacherId });
    res.status(200).json({
      success: true,
      message: "Users found",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

// export const getStudentAppointments = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.userId });
//     const teacherIds = bookings.map((el) => el.teacher.id);
//     const teachers = await Teacher.find(
//       { _id: { $in: teacherIds } }.select("-password")
//     );
//     res.status(200).json({
//       success: true,
//       message: "Appointment data found",
//       data: teachers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong ",
//     });
//   }
// };
