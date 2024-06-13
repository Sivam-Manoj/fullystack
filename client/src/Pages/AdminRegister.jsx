import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAdminUserMutation } from "../Store/slices/adminSlice";
import { useDispatch } from "react-redux";
import { adminlogin } from "../Store/slices/authAdminSlice";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const { registerAdminUser } = useRegisterAdminUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefualt();
    try {
      const response = await registerAdminUser({
        name,
        email,
        password,
        code,
      }).unwrap();
      dispatch(adminlogin(response));
      toast.success(`user ${response.name} registered succesfull`);
      navigate("/admin");
    } catch (error) {
      toast.error(`${error.message ? error.message : error}`);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started as admin
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              create your admin account
            </p>
            <div>
              <label htmlFor="email" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
            <div>
              <label htmlFor="password" className="sr-only">
                code
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter your secret code"
                  autoComplete="false"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign up
            </button>

            <p className="text-center text-sm text-gray-500">
              Already a admin?
              <Link className="underline" to="/admin-login">
                Sign in as admin
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
