// client/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to BookingApp</h1>
        <p>Connecting customers with trusted providers, anytime, anywhere.</p>
        {!user ? (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        ) : (
          <div className="hero-actions">
            {user.role === "customer" && (
              <Link to="/providers" className="btn btn-primary">Find Providers</Link>
            )}
            {user.role === "provider" && (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            )}
            <Link to="/profile" className="btn btn-secondary">My Profile</Link>
          </div>
        )}
      </header>

      <section className="features-section">
        <h2>Why Choose BookingApp?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Scheduling</h3>
            <p>Book appointments with just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Providers</h3>
            <p>Browse verified professionals and services.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Enjoy safe and reliable transactions.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        {!user ? (
          <Link to="/register" className="btn btn-primary">Join Now</Link>
        ) : (
          <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
        )}
      </section>
    </div>
  );
};

export default Home;
