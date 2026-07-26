// client/src/pages/ProviderProfile.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProviderServices,
  getProviderAvailability,
} from "../services/providerService";
import { getProviderReviews } from "../services/reviewService";
import LoadingSpinner from "../components/LoadingSpinner";

const ProviderProfile = () => {
  const { id } = useParams(); // provider ID from route
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch provider details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, availabilityData, reviewsData] = await Promise.all([
          getProviderServices(id),
          getProviderAvailability(id),
          getProviderReviews(id),
        ]);

        // Assuming backend returns provider info inside servicesData
        setProvider(servicesData.provider || { name: "Unknown Provider" });
        setServices(servicesData.services || []);
        setAvailability(availabilityData || []);
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load provider profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="provider-profile-page">
      {error && <p className="error-text">{error}</p>}

      {provider ? (
        <>
          <h2>{provider.name}</h2>
          <p><strong>Email:</strong> {provider.email}</p>
          <p><strong>Role:</strong> {provider.role}</p>

          {/* Services */}
          <section>
            <h3>Services Offered</h3>
            {services.length === 0 ? (
              <p>No services listed.</p>
            ) : (
              <ul>
                {services.map((service) => (
                  <li key={service._id}>
                    {service.name} - ${service.price}
                    <Link to={`/checkout/${service._id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Availability */}
          <section>
            <h3>Availability</h3>
            {availability.length === 0 ? (
              <p>No availability slots listed.</p>
            ) : (
              <ul>
                {availability.map((slot) => (
                  <li key={slot._id}>
                    {new Date(slot.date).toLocaleString()} ({slot.duration} mins)
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Reviews */}
          <section>
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul>
                {reviews.map((review) => (
                  <li key={review._id}>
                    ⭐ {review.rating} - {review.comment}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <p>Provider not found.</p>
      )}
    </div>
  );
};

export default ProviderProfile;
