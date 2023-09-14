import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from "../helper/helper";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

const RecoveryForm = () => {
  const [recoveryOtp, setRecoveryOTP] = useState({
    email: "",
    otp: "",
    otpSent: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecoveryOTP({ ...recoveryOtp, [e.target.name]: e.target.value });
  };

  const emailSubmit = (e) => {
    e.preventDefault();
    const { email } = recoveryOtp;
    generateOTP(email)
      .then((OTP) => {
        if (OTP) {
          toast.success("OTP sent to your email");
          setRecoveryOTP({ ...recoveryOtp, otpSent: true });
          return;
        }
        toast.error("Problem while generating OTP");
      })
      .catch((error) => {
        toast.error("User not found! ");

        setRecoveryOTP({ ...recoveryOtp, otpSent: false });
      });
  };

  const otpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await verifyOTP({
        email: recoveryOtp.email,
        code: recoveryOtp.otp,
      });

      if (status === 201) {
        toast.success("OTP verified successfully");
        navigate(`/reset/${recoveryOtp.email}`, { replace: true });
      } else {
        toast.error("Wrong OTP! Check your email again");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Wrong OTP");
    }
  };

  const resendOTP = async () => {
    const { email } = recoveryOtp;

    let sendPromise = generateOTP(email);
    toast.promise(sendPromise, {
      loading: "Sending OTP...",
      success: <b>OTP sent successfully</b>,
      error: <b>Problem while sending OTP</b>,
    });
    sendPromise.then((OTP) => {
      console.log("OTP:", OTP);
    });
  };

  const formSubmit = recoveryOtp.otpSent ? otpSubmit : emailSubmit;

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {recoveryOtp.otpSent
            ? "Enter OTP sent to your email"
            : "Enter your email"}
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
          {recoveryOtp.otpSent ? (
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
                value={recoveryOtp.otp}
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
                value={recoveryOtp.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
          )}
          {recoveryOtp.otpSent && (
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>

              <Link
                onClick={resendOTP}
                to="/recovery"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Resend OTP?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full text-xl flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {recoveryOtp.otpSent ? (
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
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RecoveryForm;
