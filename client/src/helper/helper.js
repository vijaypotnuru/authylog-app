import axios from "axios";

axios.defaults.baseURL = "https://ill-tan-cricket-wear.cyclic.cloud/";

/**Make API Request */

/** Get User Details*/
export const getUser = async ({ username }) => {
  try {
    const data = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
};
export const getUserByMail = async ({ email }) => {
  try {
    const data = await axios.get(`/api/userbymail/${email}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
};

/** Signup User */
export const signup = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/signup", credentials);
    let { username, email } = credentials;
    console.log("credentials", credentials);

    //send mail to user
    if (status === 200) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
};

/** Login User */
export const login = async ({ email, password }) => {
  try {
    if (email) {
      const { data } = await axios.post("/api/login", { email, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...! " });
  }
};

/**Update User Profile */
export const updateUser = async (response) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update user profile...!" });
  }
};

/** Generate OTP */
export const generateOTP = async (email) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { email } });

    //send mail with the OTP
    if (status === 201) {
      let {
        data: { username },
      } = await getUserByMail({ email });

      let text = `Your Password Reset OTP is ${code}. Please don't share it with anyone.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Reset OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
};

/** Verify OTP */
export const verifyOTP = async ({ email, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { email, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Reset Password */
export const resetPassword = async ({ email, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      email,
      password,
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
};

/** Create Reset Session */
export const createResetSession = async () => {
  try {
    const { data, status } = await axios.get("/api/createResetSession");
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}