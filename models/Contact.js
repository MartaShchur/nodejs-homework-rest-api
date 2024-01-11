import { Schema, model } from "mongoose";
import Joi from "joi";

import {handleSaveError, addUpdateSettings } from "./hooks.js";

// Mongoose 
const contactSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  
  email: {
    type: String,
  },
    
  phone: {
    type: String,
  },
    
  favorite: {
    type: Boolean,
    default: false,
  },
  
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
 
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", addUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

// Joi Schema
const foo = (text) => {
  return { "any.required": `"${text}" must be exist` };
};

export const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
        .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `Missing field favorite` }),
});

export const contactsUpdadeSchema = Joi.object({
  name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  favorite:Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const Contact = model("contact", contactSchema);

export default Contact;
    