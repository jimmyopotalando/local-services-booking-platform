// server/src/controllers/reviewController.js
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

// @desc Create a new review
// @route POST /api/reviews
// @access Private (Customer only)
export const createReview = async (req, res, next) => {
  try {
    const { serviceId, bookingId, rating, comment } = req.body;

    // Ensure booking exists and belongs to this customer
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to review this booking" });
    }
    if (booking.status !== "completed") {
      return res.status(400).json({ message: "You can only review completed bookings" });
    }

    const review = await Review.create({
      customerId: req.user._id,
      providerId: booking.providerId,
      serviceId,
      bookingId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    // Handle duplicate review error
    if (err.code === 11000) {
      return res.status(400).json({ message: "You have already reviewed this booking" });
    }
    next(err);
  }
};

// @desc Get reviews for a service
// @route GET /api/reviews/service/:serviceId
// @access Public
export const getServiceReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId })
      .populate("customerId", "name profilePicUrl")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// @desc Get reviews for a provider
// @route GET /api/reviews/provider/:providerId
// @access Public
export const getProviderReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate("customerId", "name profilePicUrl")
      .populate("serviceId", "title category")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// @desc Update a review
// @route PUT /api/reviews/:id
// @access Private (Customer only)
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    next(err);
  }
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Private (Customer only)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
