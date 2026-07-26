// client/src/pages/BookingCheckout.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../services/providerService";
import { createBooking } from "../services/bookingService";
import LoadingSpinner from "../components/LoadingSpinner";

const BookingCheckout = () => {
  const { serviceId } = useParams(); // service ID from route
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(serviceId);
        setService(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createBooking({ serviceId, date });
      navigate("/my-bookings"); // redirect after booking
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="booking-checkout-page">
      <h2>Booking Checkout</h2>
      {error && <p className="error-text">{error}</p>}

      {service ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="service-summary">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <p><strong>Provider:</strong> {service.provider?.name}</p>
          </div>

          <div className="form-group">
            <label>Select Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      ) : (
        <p>Service not found.</p>
      )}
    </div>
  );
};

export default BookingCheckout;
