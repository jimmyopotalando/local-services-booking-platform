// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component
 * Wraps around routes that require authentication and/or specific roles.
 *
 * @param {ReactNode} children - The component to render if authorized
 * @param {Array} roles - Optional array of allowed roles (e.g., ["provider", "admin"])
 */
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user's role is not allowed, redirect to home
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
