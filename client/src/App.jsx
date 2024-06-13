import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLogin from "./Pages/AdminLogin";
import AdminRegister from "./Pages/AdminRegister";
import RootLayout from "./Components/RootLayout";
import AdminRootLayout from "./Components/AdminRootLayout";
import ProtectedPage from "./Pages/ProtectedPage";
import VideoPage from "./Pages/VideoPage";
import NotesPage from "./Pages/NotesPage";
import DonatePage from "./Pages/DonatePage";
import ContactPage from "./Pages/ContactPage";
import AdminVideos from "./Pages/AdminVideos";
import AdminNotes from "./Pages/AdminNotes";
import AdminUpload from "./Pages/AdminUpload";
import AdminProtectedPage from "./Pages/AdminProtectedPage";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedPage />,
        children: [
          { index: true, element: <Home /> },
          { path: "/videos", element: <VideoPage /> },
          { path: "/notes", element: <NotesPage /> },
          { path: "/donate", element: <DonatePage /> },
          { path: "/contact", element: <ContactPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/admin-register", element: <AdminRegister /> },
  {
    path: "/admin",
    element: <AdminRootLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminProtectedPage />,
        children: [
          // Admin home page
          { index: true, element: <AdminVideos /> },
          { path: "notes", element: <AdminNotes /> },
          { path: "uploads", element: <AdminUpload /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer limit={1} />
    </>
  );
};

export default App;
