import express from "express";

import authController from "../../controllers/auth-controller.js";
import {
  isEmptyBody,
  validateBody,
  authenticate,
  upload
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

authRouter.get("/current",
  authenticate,
  authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);
authRouter.patch("/avatars",upload.single("avatar"),authenticate,authController.updateAvatar)



export default authRouter;

