import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <footer className="bg-white lg:grid lg:grid-cols-5 mt-11">
        <div className="relative block h-32 lg:col-span-2 lg:h-full">
          <img
            src="https://images.pexels.com/photos/21696/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Call us
                </span>
                <a className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl">
                  +94 779613384
                </a>
              </p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <a
                    href="https://www.linkedin.com/in/sivammanoj"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Sivam-Manoj"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://13.51.172.58:1337/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Portfolio</span>
                    <SiAboutdotme className="h-6 w-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-gray-900">Contact</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="mailto:manom8193@gmail.com"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      manom8193@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+94779613384"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      +94 779613384
                    </a>
                  </li>
                  <li className="text-gray-700">
                    Senaithurai Road, Koddaikallar-01, Batticalo
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                &copy; 2024. Fully Stack. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
