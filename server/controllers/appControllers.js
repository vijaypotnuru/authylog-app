import UserModel from "../model/User.model";

/** POST: http://localhost:5000/api/signup
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "description" : "Full Stack Developer with Solid Experience in React, Node, Express, MongoDB, MySQL, HTML, CSS, JavaScript",
  
}
*/
export const signup = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      mobile,
      description,
    } = req.body;

    // Check if user already exists
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) reject(new Error("Error Occured"));
        if (user) reject(new Error("Username already exists"));
        resolve();
      });
    });

    // Check if email already exists
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email: email }, (err, email) => {
        if (err) reject(new Error("Error Occured"));
        if (email) reject(new Error("Email already exists"));
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {})
      .catch((error) => {
        return res.status(400).send({
          error: "Enable to hashed password",
        });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/** POST: http://localhost:5000/api/login 
 * @param: {
  "email" : "example123",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  res.json("Login Route");
};

/** POST: http://localhost:5000/api/user/example123*/
export const getUser = async (req, res) => {
  res.json("Get User Route");
};

/** PUT: http://localhost:5000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    lastName: '',
    description : '',
    mobileNo: '',
}
*/
export const updateUser = async (req, res) => {
  res.json("Update User Route");
};

/** GET: http://localhost:5000/api/generateOTP */
export const generateOTP = async (req, res) => {
  res.json("Generate OTP Route");
};

/** POST: http://localhost:5000/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  res.json("Verify OTP Route");
};

// successfully redict user when OTP is verified
/** POST: http://localhost:5000/api/createResetSession */
export const createResetSession = async (req, res) => {
  res.json("Create Reset Session Route");
};

/** POST: http://localhost:5000/api/resetPassword */
export const resetPassword = async (req, res) => {
  res.json("Reset Password Route");
};
