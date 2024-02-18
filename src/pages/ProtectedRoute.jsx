import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) Navigate("/");
  }, [isAuthenticated, Navigate]);

  return isAuthenticated ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ProtectedRoute;
