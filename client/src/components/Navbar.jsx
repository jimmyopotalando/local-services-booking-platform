import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">BookingApp</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/providers">Find Providers</Link></li>
        {user && user.role === "customer" && (
          <li><Link to="/my-bookings">My Bookings</Link></li>
        )}
        {user && user.role === "provider" && (
          <li><Link to="/dashboard">Dashboard</Link></li>
        )}
        {user ? (
          <>
            <li><Link to="/profile">My Profile</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
