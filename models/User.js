import { Schema, model } from "mongoose";
import Joi from "joi";

import {handleSaveError, addUpdateSettings } from "./hooks.js";

// Mongoose 
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

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
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },

    token: {
      type: String,
      default: '',
        },
    
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
        }
    
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
