// server/src/models/AvailabilitySlot.js
import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: {
      type: String, // e.g. "09:00"
      required: true,
    },
    endTime: {
      type: String, // e.g. "10:00"
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent overlapping slots for the same provider
availabilitySlotSchema.index(
  { providerId: 1, dayOfWeek: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

const AvailabilitySlot = mongoose.model("AvailabilitySlot", availabilitySlotSchema);

export default AvailabilitySlot;
