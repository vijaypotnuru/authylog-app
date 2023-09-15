import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import authMiddleware, { localVariables } from "./middleware/auth.js";
import { registerMail } from "./controllers/mailer.js";

// Import All Models
import UserModel from "./model/User.model.js";

// Import All Controllers
import * as controller from "./controllers/appControllers.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

/** HTTP POST Request */
app.post("/api/signup", controller.signup);
app.post("/api/registerMail", registerMail);
app.post("/api/login", controller.verifyUser, controller.login);

/** HTTP GET Request */
app.get("/api/user/:username", controller.getUser);
app.get("/api/userbymail/:email", controller.getUserByMail);
app.get(
  "/api/generateOTP",
  controller.verifyUser,
  localVariables,
  controller.generateOTP
);
app.get("/api/verifyOTP", controller.verifyUser, controller.verifyOTP);
app.get("/api/createResetSession", controller.createResetSession);

/** HTTP PUT Request */

app.put("/api/updateuser", authMiddleware, controller.updateUser);
app.put("/api/resetPassword", controller.verifyUser, controller.resetPassword);

/** Start Server only when we have valid connection*/
const port = process.env.PORT || 5000;

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
      });
    } catch (error) {
      console.log("Error connecting to the database", error);
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });
