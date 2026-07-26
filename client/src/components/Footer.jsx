// client/src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left section */}
        <div className="footer-left">
          <h2 className="logo">BookingApp</h2>
          <p>Connecting customers with trusted providers.</p>
        </div>

        {/* Center section */}
        <div className="footer-center">
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/providers">Providers</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* Right section */}
        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()} BookingApp</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
