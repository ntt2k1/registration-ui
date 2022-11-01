import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllow, children }) => {
  if (!isAllow) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute
