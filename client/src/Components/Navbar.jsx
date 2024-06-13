import { useState } from "react";
import { RiMenuFold2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/slices/authSlice";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full h-16 flex justify-between items-center bg-slate-500 text-[aliceblue] px-4 sticky top-0 left-0 z-20">
      <div className="text-xl font-bold">
        <span>Fully Stack</span>
      </div>
      <nav className="flex items-center">
        <ul
          className={`${
            isOpen
              ? "flex flex-col absolute top-16 left-0 w-full z-10 bg-slate-400 transition-transform duration-500 ease-in-out pb-3 transform translate-y-0 sm:hidden"
              : "hidden transition-transform duration-500 ease-in-out transform -translate-y-full mt-[4.2rem] sm:flex sm:flex-row sm:gap-1 sm:mr-6 md:gap-[2rem] md:mr-[8rem] lg:gap-[4rem]"
          }`}
        >
          <li className="py-2 sm:py-0" onClick={() => setIsOpen(false)}>
            <Link
              href="/"
              className="block px-4 py-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 rounded-lg"
            >
              Home
            </Link>
          </li>
          <li className="py-2 sm:py-0" onClick={() => setIsOpen(false)}>
            <Link
              to="/videos"
              className="block px-4 py-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 rounded-lg"
            >
              Videos
            </Link>
          </li>
          <li className="py-2 sm:py-0" onClick={() => setIsOpen(false)}>
            <Link
              to="/notes"
              className="block px-4 py-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 rounded-lg"
            >
              Notes
            </Link>
          </li>

          <button
            className="bg-blue-600 rounded-xl mt-1 w-[100px] hover:bg-blue-500 duration-300 py-2 sm:py-0"
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </ul>
        {!isOpen ? (
          <RiMenuFold2Line
            className="text-3xl sm:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <IoMdClose
            className="text-3xl sm:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
