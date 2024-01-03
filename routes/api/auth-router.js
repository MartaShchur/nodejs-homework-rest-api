import express from "express";

import authController from "../../controllers/auth-controller.js";
import {
  isEmptyBody,
  validateBody,
  authenticate
} from "../../middlewares/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";


const authRouter = express.Router();

authRouter.post("/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup);

authRouter.post("/signin",
  isEmptyBody, validateBody(userSigninSchema),
  authController.signin);

authRouter.post("/current",
  authenticate,
  authController.getCurrent);

export default authRouter;

