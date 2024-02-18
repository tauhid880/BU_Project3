import express from "express";
import {
  bookingAppointments,
  getAllBookings,
  deleteBooking,
  getIndividualPendingdBookings,
  updateIndividualTeacherBookings,
} from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/booking-checkout/:teacherId", bookingAppointments);
router.get("/", getAllBookings);
router.get("/:email", getIndividualPendingdBookings);
router.put("/:id", updateIndividualTeacherBookings);
router.delete("/:id", deleteBooking);

export default router;
