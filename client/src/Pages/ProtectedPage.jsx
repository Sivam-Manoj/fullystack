import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedPage;
