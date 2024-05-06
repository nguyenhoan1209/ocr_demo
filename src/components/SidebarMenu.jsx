import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import FrontImageContext from "../context/FrontImageContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, CreditCard, StickyNote, LogIn, BookUser, ScanFace } from "lucide-react";

const SidebarMenu = () => {
  const [token, setToken] = useContext(AuthContext);
  const [frontImg, setFrontImg] = useContext(FrontImageContext);

  const navigate = useNavigate();

  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    // Update activePage state based on URL pathname
    const pathname = location.pathname;
    setActivePage(pathname);
  }, [location.pathname]);

  const logoutUser = () => {
    // e.preventDefault()
    localStorage.removeItem("authToken");
    setToken(null);

    localStorage.removeItem("frontImg");
    setFrontImg(null);


    navigate("/");
  };

  return (
    <>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <a href="#" className="flex ms-2 md:me-24">
                  <img
                    src="./assets/img/logos/logo_its_1.png"
                    className="h-8 me-3"
                    alt="FlowBite Logo"
                  />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    InterITS
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  {token ? (
                    <div className="flex items-center gap-4">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                      <button
                        onClick={logoutUser}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <form className="max-w-md mx-auto">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search "
                            required
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 ">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/"
                  target="_self"
                  className={`flex items-center p-2 rounded-lg text-black hover:scale-110 group ${activePage === "/" && "bg-gray-300"}`}
                >
                  <Home />
                  <span className="ms-3">Home</span>
                </a>
              </li>

              <li>
                <a
                  href="/ekyc"
                  target="_self"
                  className={`flex items-center p-2 rounded-lg text-black hover:scale-110 group ${activePage === "/ekyc" && "bg-gray-300"}`}
                >
                  <CreditCard />
                  <span className="flex-1 ms-3 whitespace-nowrap">EKYC</span>
                </a>
              </li>
              <li>
                <a
                  href="/face-matching"
                  className={`flex items-center p-2 rounded-lg text-black hover:scale-110 group ${activePage === "/face-matching" && "bg-gray-300"}`}
                >
                  <ScanFace />
                  <span className="flex-1 ms-3 whitespace-nowrap">Face Matching</span>
                </a>
              </li>

              <li>
                <a
                  href="/business-license"
                  className={`flex items-center p-2 rounded-lg text-black hover:scale-110 group ${activePage === "/business-license" && "bg-gray-300"}`}
                >
                  <StickyNote />
                  <span className="flex-1 ms-3 whitespace-nowrap">Business License</span>
                </a>
              </li>
              {!token ? (
                <ul className="pt-4 mt-8 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                  <li>
                    <a
                      href="/login"
                      target="_self"
                      className="flex items-center p-2 text-black hover:scale-110 group"
                    >
                      <LogIn />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Sign In
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      target="_self"
                      className="flex items-center p-2 text-black  hover:scale-110 group"
                    >
                      <BookUser />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Sign Up
                      </span>
                    </a>
                  </li>
                </ul>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarMenu;
