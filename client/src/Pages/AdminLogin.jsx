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
    e.preventDefault();
    try {
      const response = await loginAdminUser({ email, password }).unwrap();
      dispatch(adminlogin(response));
      toast.success("Admin logged in successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("invalid credentials");
    }
  };

  return (
    <section className="flex flex-wrap lg:h-screen lg:items-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Let&apos;s change the world :)
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-white">
            Sign in to your admin account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md focus:ring-2 focus:ring-purple-500"
                placeholder="Enter email"
                required
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
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-purple-700 hover:bg-purple-800 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <div className="flex justify-evenly text-white text-sm mt-4">
            <p className="text-[12px]">
              No admin?
              <Link className="underline ml-1 text-[12px]" to="/admin-register">
                Sign up as admin
              </Link>
            </p>
            <p className="text-[12px]">
              Sign in as user?
              <Link className="underline ml-1 text-[12px]" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Admin login background"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default AdminLogin;
