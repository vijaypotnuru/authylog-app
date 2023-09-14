import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, createResetSession } from "../helper/helper";

const ResetForm = () => {
  const [resetPass, setresetPass] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const resetSession = async () => {
      try {
        const { data } = await createResetSession();
        if (data.flag) {
          // session started
          return toast.success("Reset Session started successfully");
        }
      } catch (error) {
        toast.error("Session expired!");
        return navigate("/recovery");
      }
    };

    resetSession();
  }, [navigate]);

  console.log(email);

  const handleInputChange = (e) => {
    setresetPass({ ...resetPass, [e.target.name]: e.target.value });
    console.log(resetPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetPass.newPassword !== resetPass.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    let resetPromise = resetPassword({
      email,
      password: resetPass.newPassword,
    });
    toast.promise(resetPromise, {
      loading: "Resetting Password...",
      success: <b>Password Reset Successfully</b>,
      error: <b>Problem while resetting password</b>,
    });
    navigate("/", { replace: true });
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
            type={resetPass.showPassword ? "text" : "password"}
            name="newPassword"
            id="password"
            value={resetPass.newPassword}
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
            type="text"
            name="confirmPassword"
            id="confirm-password"
            value={resetPass.confirmPassword}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              onChange={() =>
                setresetPass({
                  ...resetPass,
                  showPassword: !resetPass.showPassword,
                })
              }
              id="newsletter"
              aria-describedby="newsletter"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="newsletter"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              <span
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                href="/"
              >
                Show Password
              </span>
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
