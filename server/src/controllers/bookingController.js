// server/src/controllers/bookingController.js
import Booking from "../models/Booking.js";
import AvailabilitySlot from "../models/AvailabilitySlot.js";

// @desc Create a new booking
// @route POST /api/bookings
// @access Private (Customer only)
export const createBooking = async (req, res, next) => {
  try {
    const { providerId, serviceId, slotId, notes } = req.body;

    // Ensure slot exists and is not booked
    const slot = await AvailabilitySlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Mark slot as booked
    slot.isBooked = true;
    await slot.save();

    const booking = await Booking.create({
      customerId: req.user._id,
      providerId,
      serviceId,
      slotId,
      notes,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

// @desc Get bookings for logged-in customer
// @route GET /api/bookings/my-bookings
// @access Private (Customer only)
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id })
      .populate("providerId", "name email profilePicUrl")
      .populate("serviceId", "title category price")
      .populate("slotId", "dayOfWeek startTime endTime");

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// @desc Get bookings for logged-in provider
// @route GET /api/bookings/provider
// @access Private (Provider only)
export const getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ providerId: req.user._id })
      .populate("customerId", "name email profilePicUrl")
      .populate("serviceId", "title category price")
      .populate("slotId", "dayOfWeek startTime endTime");

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// @desc Update booking status
// @route PUT /api/bookings/:id/status
// @access Private (Provider only)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this booking" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    next(err);
  }
};

// @desc Cancel a booking
// @route DELETE /api/bookings/:id
// @access Private (Customer only)
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    // Free up the slot
    const slot = await AvailabilitySlot.findById(booking.slotId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};
