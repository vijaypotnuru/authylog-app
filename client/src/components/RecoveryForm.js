import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

const RecoveryForm = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    otp: "",
    otpSent: false,
  });

  console.log(userDetails.otpSent);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const emailSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    setUserDetails({ email: "", otp: "" });
    toast.success("OTP sent to your email");
    setUserDetails({ ...userDetails, otpSent: true });
  };

  const otpSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails.otp);
  };

  const formSubmit = userDetails.otpSent ? otpSubmit : emailSubmit;

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {userDetails.otpSent
            ? "Enter OTP sent to your email"
            : "Enter your email"}
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
          {userDetails.otpSent ? (
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                OTP
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="otp"
                id="otp"
                value={userDetails.otp}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={userDetails.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
          )}
          {userDetails.otpSent && (
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>

              <Link
                to="/recovery"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Can't get OTP?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full text-xl flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {userDetails.otpSent ? (
              "Submit OTP"
            ) : (
              <>
                {" "}
                Next <BsFillArrowRightCircleFill className="ml-2" />
              </>
            )}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RecoveryForm;
