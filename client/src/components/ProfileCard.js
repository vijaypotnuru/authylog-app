import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUser } from "../helper/helper";

import UpdateProfileButton from "./UpdateProfileButton";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [userDetails, setUserDetails] = useState({
    username,
    email: "",
    description: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        } else {
          const decodedToken = jwt_decode(token);
          if (decodedToken.username !== username) {
            navigate("/", { replace: true });
            return;
          }
        }

        const response = await getUser({ username });
        if (response) {
          const { data } = response.data;
          const { email, description, firstName, lastName, mobileNo } = data;
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            email,
            description,
            firstName,
            lastName,
            mobileNo,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate, username]);

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 py-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1693023269/PngItem_1468281_tcmtx2.png"
          alt="ProfileImage"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userDetails.firstName} {userDetails.lastName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {username}
        </span>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Email: {userDetails.email}
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Mobile No: {userDetails.mobileNo}
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Description:
          <br />
          {userDetails.description}
        </p>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <UpdateProfileButton userDetails={userDetails} />
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Do you want to{" "}
          <span
            onClick={onLogOut}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
          >
            Log out
          </span>{" "}
          ?
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
