import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";


const AdminRootLayout = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.admin);
  if (isAdminLoggedIn) {
    return (
      <>
        <AdminNavbar />
        <Outlet />
        <Footer />
      </>
    );
  } else return <Navigate to="/admin-login" replace />;
};

export default AdminRootLayout;
