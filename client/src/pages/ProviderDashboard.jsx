// client/src/pages/ProviderDashboard.jsx
import { useState, useEffect } from "react";
import {
  getProviderServices,
  createService,
  updateService,
  deleteService,
  getProviderAvailability,
  createAvailabilitySlot,
  deleteAvailabilitySlot,
} from "../services/providerService";
import { getProviderBookings, updateBookingStatus } from "../services/bookingService";
import LoadingSpinner from "../components/LoadingSpinner";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch provider data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, availabilityData, bookingsData] = await Promise.all([
          getProviderServices("me"), // assuming "me" resolves to logged-in provider
          getProviderAvailability("me"),
          getProviderBookings(),
        ]);
        setServices(servicesData);
        setAvailability(availabilityData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Service management
  const handleAddService = async () => {
    const newService = { name: "New Service", description: "Describe here", price: 100 };
    const created = await createService(newService);
    setServices((prev) => [...prev, created]);
  };

  const handleUpdateService = async (id) => {
    const updated = await updateService(id, { price: 150 });
    setServices((prev) => prev.map((s) => (s._id === id ? updated : s)));
  };

  const handleDeleteService = async (id) => {
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  // Availability management
  const handleAddSlot = async () => {
    const newSlot = { date: new Date().toISOString(), duration: 60 };
    const created = await createAvailabilitySlot(newSlot);
    setAvailability((prev) => [...prev, created]);
  };

  const handleDeleteSlot = async (id) => {
    await deleteAvailabilitySlot(id);
    setAvailability((prev) => prev.filter((slot) => slot._id !== id));
  };

  // Booking management
  const handleUpdateBookingStatus = async (id, status) => {
    const updated = await updateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="provider-dashboard">
      <h2>Provider Dashboard</h2>
      {error && <p className="error-text">{error}</p>}

      {/* Services Section */}
      <section>
        <h3>My Services</h3>
        <button onClick={handleAddService}>Add Service</button>
        <ul>
          {services.map((service) => (
            <li key={service._id}>
              {service.name} - ${service.price}
              <button onClick={() => handleUpdateService(service._id)}>Update</button>
              <button onClick={() => handleDeleteService(service._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Availability Section */}
      <section>
        <h3>Availability Slots</h3>
        <button onClick={handleAddSlot}>Add Slot</button>
        <ul>
          {availability.map((slot) => (
            <li key={slot._id}>
              {new Date(slot.date).toLocaleString()} ({slot.duration} mins)
              <button onClick={() => handleDeleteSlot(slot._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Bookings Section */}
      <section>
        <h3>Bookings</h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.customer?.name} booked {booking.service?.name} on{" "}
              {new Date(booking.date).toLocaleString()} - Status: {booking.status}
              {booking.status === "pending" && (
                <>
                  <button onClick={() => handleUpdateBookingStatus(booking._id, "confirmed")}>
                    Confirm
                  </button>
                  <button onClick={() => handleUpdateBookingStatus(booking._id, "cancelled")}>
                    Cancel
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProviderDashboard;
