import React from "react";

import UpdateProfileButton from "./UpdateProfileButton";

const ProfileCard = () => {
  
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1693023269/PngItem_1468281_tcmtx2.png"
          alt="Bonnieimage"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <UpdateProfileButton />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
