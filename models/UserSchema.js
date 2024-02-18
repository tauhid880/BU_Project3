import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    id: { type: Number },
    photo: { type: String },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    batch: { type: String },

    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
