import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** middleware to verify user*/
export const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;

    let exist = await UserModel.findOne({ email });
    if (!exist) return res.status(404).json({ error: "User not found!" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Error" });
  }
};

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
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUsername = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      password: hashedPassword,
      email,
      firstName: "",
      lastName: "",
      mobileNo: "",
      description: "",
    });

    await user.save();
    console.log(user);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
};

/** POST: http://localhost:5000/api/login 
 * @param: {
  "email" : "example@gmail.com",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Finding the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Comparing the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //  JWT token Creatation
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "secret",
      {
        expiresIn: "24h",
      }
    );

    res
      .status(200)
      .json({ msg: "Login successful", username: user.username, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

/** POST: http://localhost:5000/api/user/example123*/
export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(400).json({ error: "Invalid Username" });
    }

    console.log("Username", username);
    const user = await UserModel.findOne({ username }).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /** remove password from user */
    // mongoose return unnecessary data with object so convert it into json
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(200).json(rest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    console.log("ID", id);
    const body = req.body;
    console.log("Body", body);

    // Check if the body contains data to update
    if (!Object.keys(body).length) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });

  }
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
