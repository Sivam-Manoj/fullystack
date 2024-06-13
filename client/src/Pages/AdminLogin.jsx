import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminUserMutation } from "../Store/slices/adminSlice";
import { adminlogin } from "../Store/slices/authAdminSlice";
import { toast } from "react-toastify";


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAdminLoggedIn } = useSelector((state) => state.admin);
  const [loginAdminUser] = useLoginAdminUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the typo here
    try {
      const response = await loginAdminUser({ email, password }).unwrap();
      dispatch(adminlogin(response));
      toast.success("admin logged in succesfull")
      navigate("/admin");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            let&apos;s change the world:)
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your admin account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <div className="flex justify-evenly">
              <p className="text-center text-sm text-gray-500">
                No admin?
                <Link className="underline" to="/admin-register">
                  Sign up as admin
                </Link>
              </p>
              <p className="text-center text-sm text-gray-500">
                Sign in as user?
                <Link className="underline" to="/login">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
