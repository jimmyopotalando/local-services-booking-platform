// client/src/pages/ProviderSearch.jsx
import { useState, useEffect } from "react";
import { getProviderServices } from "../services/providerService";
import { getProviderReviews } from "../services/reviewService";
import LoadingSpinner from "../components/LoadingSpinner";

const ProviderSearch = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({});

  // Fetch all providers + services
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviderServices("all"); // backend should return all providers
        setProviders(response);
        setFilteredProviders(response);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load providers.");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProviders(providers);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredProviders(
        providers.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.services?.some((s) => s.name.toLowerCase().includes(lower))
        )
      );
    }
  }, [searchTerm, providers]);

  // Fetch reviews for a provider
  const fetchReviews = async (providerId) => {
    try {
      const data = await getProviderReviews(providerId);
      setReviews((prev) => ({ ...prev, [providerId]: data }));
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="provider-search-page">
      <h2>Find Providers</h2>
      {error && <p className="error-text">{error}</p>}

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search providers or services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredProviders.length === 0 ? (
        <p>No providers found.</p>
      ) : (
        <ul className="provider-list">
          {filteredProviders.map((provider) => (
            <li key={provider._id} className="provider-card">
              <h3>{provider.name}</h3>
              <p><strong>Email:</strong> {provider.email}</p>

              <h4>Services:</h4>
              <ul>
                {provider.services?.map((service) => (
                  <li key={service._id}>
                    {service.name} - ${service.price}
                  </li>
                ))}
              </ul>

              <button onClick={() => fetchReviews(provider._id)}>
                View Reviews
              </button>

              {reviews[provider._id] && (
                <div className="reviews-section">
                  <h4>Reviews:</h4>
                  <ul>
                    {reviews[provider._id].map((review) => (
                      <li key={review._id}>
                        ⭐ {review.rating} - {review.comment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProviderSearch;
