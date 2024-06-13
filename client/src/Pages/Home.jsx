import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaVideo, FaFileAlt, FaEnvelope, FaDonate } from "react-icons/fa";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isAdminLoggedIn } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isAdminLoggedIn) {
      navigate("/login", { replace: true });
    } else if (isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, isAdminLoggedIn, navigate]);

  if (isLoggedIn) {
    return (
      <>
        <section className="mb-[5rem]">
          <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
              <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Find your career path
                  <br />
                  in One Place
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Link
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  to="/videos"
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <FaVideo className="h-6 w-6" />
                  </span>

                  <h2 className="mt-2 font-bold">Videos</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    Watch full stack development videos in one place.
                  </p>
                </Link>

                <Link
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  to="/notes"
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <FaFileAlt className="h-6 w-6" />
                  </span>

                  <h2 className="mt-2 font-bold">Notes</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    get notes.
                  </p>
                </Link>

                <Link
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  to="/contact"
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <FaEnvelope className="h-6 w-6" />
                  </span>

                  <h2 className="mt-2 font-bold">Contact</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    Get in touch with us.
                  </p>
                </Link>

                <Link
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  to="/donate"
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <FaDonate className="h-6 w-6" />
                  </span>

                  <h2 className="mt-2 font-bold">Donate</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    Support our cause.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else return <Navigate to="/login" replace />;
};

export default Home;
