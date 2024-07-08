import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterApiMutation } from "../Store/slices/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../Store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [registerApi] = useRegisterApiMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = { name, email, password };

    try {
      const response = await registerApi(formValues).unwrap();
      dispatch(login(response));
      navigate("/", { replace: true });
      toast.success("User registered successfully");
    } catch (error) {
      toast.error("Failed to register");
    }
  };

  return (
    <section className="flex flex-wrap lg:h-screen lg:items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">Get started today!</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter name"
                required
              />
            </div>
          </div>

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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md focus:ring-2 focus:ring-green-500"
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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-200">
              Already a user?
              <Link className="underline" to="/login">
                {" "}
                Sign in
              </Link>
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-green-700 hover:bg-green-800 px-5 py-3 text-xs font-medium text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Registration background"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
