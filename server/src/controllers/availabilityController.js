// server/src/controllers/availabilityController.js
import AvailabilitySlot from "../models/AvailabilitySlot.js";

// @desc Create a new availability slot
// @route POST /api/availability
// @access Private (Provider only)
export const createSlot = async (req, res, next) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;

    const slot = await AvailabilitySlot.create({
      providerId: req.user._id,
      dayOfWeek,
      startTime,
      endTime,
    });

    res.status(201).json(slot);
  } catch (err) {
    // Handle duplicate slot error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Slot already exists for this time" });
    }
    next(err);
  }
};

// @desc Get all slots for a provider
// @route GET /api/availability/provider/:providerId
// @access Public
export const getProviderSlots = async (req, res, next) => {
  try {
    const slots = await AvailabilitySlot.find({
      providerId: req.params.providerId,
      isBooked: false,
    }).sort({ dayOfWeek: 1, startTime: 1 });

    res.json(slots);
  } catch (err) {
    next(err);
  }
};

// @desc Get logged-in provider's slots
// @route GET /api/availability/my-slots
// @access Private (Provider only)
export const getMySlots = async (req, res, next) => {
  try {
    const slots = await AvailabilitySlot.find({ providerId: req.user._id }).sort({
      dayOfWeek: 1,
      startTime: 1,
    });

    res.json(slots);
  } catch (err) {
    next(err);
  }
};

// @desc Delete a slot
// @route DELETE /api/availability/:id
// @access Private (Provider only)
export const deleteSlot = async (req, res, next) => {
  try {
    const slot = await AvailabilitySlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this slot" });
    }

    await slot.deleteOne();
    res.json({ message: "Slot removed successfully" });
  } catch (err) {
    next(err);
  }
};
