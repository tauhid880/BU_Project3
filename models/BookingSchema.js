import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    // ticketPrice: { type: String, required: true },
    timeslot: [{ type: mongoose.Schema.Types.Mixed }],
    // required: true,
    teacherName: {
      type: String,
    },
    teacherEmail: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    designation: {
      type: String,
    },
    batch: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
    },
    userPhoto: {
      type: String,
    },
    userName: {
      type: String,
    },
    teacherPhoto: { type: String },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
