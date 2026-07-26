// client/src/pages/MyBookings.jsx
import { useState, useEffect } from "react";
import { getMyBookings, cancelBooking } from "../services/bookingService";
import LoadingSpinner from "../components/LoadingSpinner";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canceling, setCanceling] = useState(null);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCanceling(bookingId);
    setError(null);

    try {
      await cancelBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setCanceling(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>

      {error && <p className="error-text">{error}</p>}

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <div>
                <strong>Service:</strong> {booking.service?.name} <br />
                <strong>Provider:</strong> {booking.provider?.name} <br />
                <strong>Date:</strong> {new Date(booking.date).toLocaleString()} <br />
                <strong>Status:</strong> {booking.status}
              </div>
              {booking.status === "pending" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={canceling === booking._id}
                  className="cancel-btn"
                >
                  {canceling === booking._id ? "Canceling..." : "Cancel"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
