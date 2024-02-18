import User from "../models/UserSchema.js";
import Teacher from "../models/TeacherSchema.js";
import Booking from "../models/BookingSchema.js";

// export const getCheckoutSession = async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.teacherId);
//     const user = await User.findById(req.userId);
//   } catch (error) {}
// };
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;
export const bookingAppointments = async (req, res) => {
  const {
    day,
    time,
    teacherName,
    teacherEmail,
    userId,
    userName,
    teacherPhoto,
    teacherId,
    userEmail,
    designation,
    batch,
    userPhoto,
  } = req.body;

  const teacher = await Teacher.findById(req.params.teacherId);
  //   const user = await User.findById(req.userId);
  //   console.log(req.userId, req.params.teacherId);
  //   console.log(req.body);

  try {
    const booking = new Booking({
      teacher: teacherId,
      user: userId,
      teacherName,
      teacherEmail,
      userName,
      teacherPhoto,
      timeslot: { day, time },
      userEmail,
      designation,
      batch,
      userPhoto,
    });

    await booking.save();
    res.status(200).json({ success: true, message: "Booking successfully" });
  } catch (error) {
    console.log(error);
  }
};

// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({});
//     res.status(200).json({
//       success: true,
//       message: "Booking data found",
//       data: bookings,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "No booking data found",
//     });
//   }
// };

export const getAllBookings = async (req, res) => {
  try {
    const { query } = req.query;
    let bookings;
    if (query) {
      bookings = await Booking.find({
        isApproved: "approved",
      });
    } else {
      bookings = await Booking.find({ isApproved: "approved" });
    }

    res.status(200).json({
      success: true,
      message: "Booking data found",
      data: bookings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No booking data found",
    });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await Booking.findByIdAndDelete(id);
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

export const getIndividualPendingdBookings = async (req, res) => {
  try {
    const { email } = req.query; // Assuming you're passing email as a query parameter
    const pendingCount = await Booking.aggregate([
      {
        $match: { isApproved: "pending", email: email }, // Match documents where isApproved is "pending" and email matches
      },
      {
        $group: {
          _id: "$isApproved", // Group by the isApproved field
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
    ]);
    res.json({ success: true, pendingCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateIndividualTeacherBookings = async (req, res) => {
  const id = req.params.id;
  const isApproved = req.body;

  try {
    const updatedTeacherBookings = await Booking.findByIdAndUpdate(
      id,
      { $set: isApproved },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Approved",
      data: updatedTeacherBookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Approved",
    });
  }
};
