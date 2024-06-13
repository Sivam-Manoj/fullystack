import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Store/slices/authSlice"; // Assuming you have an authSlice with a login action
import { useLoginApiMutation } from "../Store/slices/userSlice";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const { isAdminLoggedIn } = useSelector((state) => state.admin);
  const [loginApi, { isLoading }] = useLoginApiMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else if (isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    if (!email || !password) {
      toast.error("Please fill all the credentials");
    }
    try {
      e.preventDefault();
      const response = await loginApi({ email, password }).unwrap();
      dispatch(login(response));
      toast.success("Logged in succesfull");
      navigate("/");
    } catch (error) {
      toast.error(error.message ? error.message : "logged in failed");
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
          <p className="mt-4 text-gray-500">
            be the top 1 by saving your valuable time!!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="underline" to="/register">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              admin?
              <Link className="underline" to="/admin-login">
                Sign in as admin
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              {!isLoading ? "Sign in" : "Loading..."}
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Login;
