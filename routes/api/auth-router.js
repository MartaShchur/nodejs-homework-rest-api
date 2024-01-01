import express from "express";

import authController from "../../controllers/auth-controller.js";
import {
  isEmptyBody,
  validateBody,
  isValidId
} from "../../middlewares/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";


const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupSchema), authController.signup);


export default authRouter;

