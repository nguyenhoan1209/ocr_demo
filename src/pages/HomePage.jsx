import React, { useContext } from "react";
import SidebarMenu from "../components/SidebarMenu";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const [token, setToken] = useContext(AuthContext);

  return (
    <>
      <SidebarMenu />
      {!token ? (
        <div className="p-4 sm:ml-64 mt-20">
          <div className="p-4 border border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10 ">
            {/* HeroBar */}
            <div className="  px-1 py-20     ">
              <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                  <div className="flex items-center justify-center h-30 rounded  dark:bg-gray-800">
                    <img
                      className="object-fill w-full h-96"
                      src="./assets/img/logos/logo_its.png"
                      alt="logo"
                    />
                  </div>
                </h1>
              </div>
            </div>
            {/*Call To Action*/}
            <div className="  items-center justify-center h-90 mb-10 mt-10 rounded  dark:bg-gray-800  "></div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:ml-64 mt-20">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className=" transition-all duration-300 rounded-lg cursor-pointer hover:grayscale object-fill w-full h-2/3"
                      src=".\assets\img\Frame6.png"
                      alt
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Nhận diện ký tự quang học
                      </h6>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Giấy tờ, căn cước, chữ ký, chữ viết tay, ...
                    </p>
                    
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className=" transition-all duration-300 rounded-lg cursor-pointer hover:grayscale object-fill w-full h-2/3"
                      src=".\assets\img\Frame6.png"
                      alt
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Nhận diện ký tự quang học
                      </h6>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Giấy tờ, căn cước, chữ ký, chữ viết tay, ...
                    </p>
                    
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className=" transition-all duration-300 rounded-lg cursor-pointer hover:grayscale object-fill w-full h-2/3"
                      src=".\assets\img\Frame6.png"
                      alt
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Nhận diện ký tự quang học
                      </h6>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Giấy tờ, căn cước, chữ ký, chữ viết tay, ...
                    </p>
                    
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className=" transition-all duration-300 rounded-lg cursor-pointer hover:grayscale object-fill w-full h-2/3"
                      src=".\assets\img\Frame6.png"
                      alt
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Nhận diện ký tự quang học
                      </h6>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Giấy tờ, căn cước, chữ ký, chữ viết tay, ...
                    </p>
                    
                  </div>
                </div>
              </div>
              
              
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
