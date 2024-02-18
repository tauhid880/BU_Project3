import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String }, // Changed to String for international phone numbers
    photo: { type: String },
    id: { type: Number },
    role: { type: String, required: true }, // Added required field
    designation: { type: String },
    teaching_area: { type: String },
    training_experience: { type: String },
    award: { type: String },

    specialization: { type: String },
    qualifications: [{ type: mongoose.Schema.Types.Mixed }], // Array of mixed type for now
    experiences: [{ type: mongoose.Schema.Types.Mixed }], // Array of mixed type for now
    timeslots: [{ type: mongoose.Schema.Types.Mixed }], // Array of mixed type for now

    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);
export default mongoose.model("Teacher", TeacherSchema);
