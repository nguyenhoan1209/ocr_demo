import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    let formData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      phone_number: phoneNumber,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      "http://125.212.225.71:8000/mirae/register",
      requestOptions
    );

    const data = await response.json();

    if (data) {
      navigate("/login");
    } else {
      console.log("Something went wrong while registed!");
    }
  };
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-10 mx-auto md:h-screen lg:py-0">
        <a
          href="https://interits.com/"
          target="_blank"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-60 h-40 mr-3"
            src="./assets/img/logos/logo_its.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:w-1/3 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4  md:space-y-6" onSubmit={registerUser}>
              <div >
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <div className="flex">
                  <div className="w-1/2">
                    <input
                      type="text"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="First name"
                      aria-label="first name"
                      aria-describedby="email-addon"
                      value={firstName}
                    onChange={(e) => setFistName(e.target.value)}
                    />
                  </div>
                  <div className="mx-1" />
                  <div className="w-1/2">
                    <input
                      type="text"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="Last name"
                      aria-label="Last name"
                      aria-describedby="email-addon"
                      value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your password"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div >
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="flex">
                  <div className="w-1/2">
                    <input
                      type="password"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="Password"
                      aria-label="first name"
                      aria-describedby="email-addon"
                      value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mx-1" />
                  <div className="w-1/2">
                    <input
                      type="password"
                      className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="Confirm your password"
                      aria-label="Last name"
                      aria-describedby="email-addon"
                      value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>


              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-br from-greenlogo-100 to-orangelogo-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  target="_self"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
