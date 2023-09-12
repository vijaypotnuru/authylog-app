import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetForm = () => {
  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleInputChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
    console.log(resetPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(resetPassword);
    setResetPassword({ newPassword: "", confirmPassword: "" });
    toast.success("Password reset successful");
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Change Password
      </h2>
      <form
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="newpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="newPassword"
            id="password"
            value={resetPassword.newPassword}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            onChange={handleInputChange}
            type="confirm-password"
            name="confirmPassword"
            id="confirm-password"
            value={resetPassword.confirmPassword}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="newsletter"
              aria-describedby="newsletter"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              for="newsletter"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the{" "}
              <a
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                href="/"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Reset passwod
        </button>
      </form>
    </div>
  );
};

export default ResetForm;
