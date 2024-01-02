import { Schema, model } from "mongoose";
import Joi from "joi";

import {handleSaveError, addUpdateSettings } from "./hooks.js";

// Mongoose 
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Set email for contact'],
      unique: true,
    },

    password: {
      type: String,
      minLength: 6,
      required: [true, 'Set password for contact'],
    },

    subscription: {
      type: String,
      enum: {
        values: [...subscriptions],
        message: `have only ${subscriptions.join(", ")}`,
      },
      default: 'starter',
    },

    token: {
      type: String,
      default: '',
        },
    
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

// Joi Schema

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
  }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
  }),
});

const User = model('user', userSchema);

export default User;
