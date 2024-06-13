import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";


const RootLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  } else return <Navigate to="/login" replace />;
};

export default RootLayout;
