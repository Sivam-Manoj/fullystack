import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedPage = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.admin);
  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default AdminProtectedPage;
