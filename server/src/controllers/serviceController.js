// server/src/controllers/serviceController.js
import Service from "../models/Service.js";

// @desc Create a new service
// @route POST /api/services
// @access Private (Provider only)
export const createService = async (req, res, next) => {
  try {
    const { title, description, category, durationMinutes, price } = req.body;

    const service = await Service.create({
      providerId: req.user._id,
      title,
      description,
      category,
      durationMinutes,
      price,
    });

    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

// @desc Get all services
// @route GET /api/services
// @access Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).populate(
      "providerId",
      "name email profilePicUrl"
    );
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// @desc Get single service by ID
// @route GET /api/services/:id
// @access Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "providerId",
      "name email profilePicUrl"
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    next(err);
  }
};

// @desc Update a service
// @route PUT /api/services/:id
// @access Private (Provider only)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Ensure only the provider who owns the service can update it
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this service" });
    }

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;
    service.durationMinutes = req.body.durationMinutes || service.durationMinutes;
    service.price = req.body.price || service.price;
    service.isActive = req.body.isActive !== undefined ? req.body.isActive : service.isActive;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    next(err);
  }
};

// @desc Delete a service
// @route DELETE /api/services/:id
// @access Private (Provider only)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Ensure only the provider who owns the service can delete it
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this service" });
    }

    await service.deleteOne();
    res.json({ message: "Service removed successfully" });
  } catch (err) {
    next(err);
  }
};
