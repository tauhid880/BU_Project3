import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import Teacher from "../models/TeacherSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
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

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
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

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Users found",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

// export const getMyAppointments = async (req, res) => {
//   const userId = req.userId;
//   console.log(userId);

//   try {
//     // Fetch bookings for the user
//     const bookings = await Booking.find({ user: userId });
//     console.log(bookings);

//     // Extract teacher IDs from bookings
//     const teacherIds = bookings.map((el) => el.teacher.id);

//     // Fetch teachers using the extracted IDs
//     const teachers = await Teacher.find({ _id: { $in: teacherIds } }).select(
//       "-password"
//     );

//     res.status(200).json({
//       success: true,
//       message: "Appointment data found",
//       data: teachers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//     console.log(error);
//   }
// };

// export const getMyAppointments = async (req, res) => {
//   const id = req.params.id;
//   // console.log(id);
//   try {
//     const bookings = await Booking.findOne(id);
//     console.log(bookings);
//     res.status(200).json({
//       success: true,
//       message: "Booking found",
//       data: bookings,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Booking not found",
//     });
//   }
// };
export const getMyAppointments = async (req, res) => {
  const userEmail = req.params.email; // Assuming this is the user's ObjectId
  try {
    const bookings = await Booking.find({
      userEmail: userEmail,
      isApproved: "approved",
    });

    res.status(200).json({
      success: true,
      message: "Bookings found",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
