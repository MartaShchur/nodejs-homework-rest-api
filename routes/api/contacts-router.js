import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {
  isEmptyBody,
  validateBody,
  isValidId,
  authenticate,
  
} from "../../middlewares/index.js";

import {contactsAddSchema,
  contactsUpdadeSchema,
  contactUpdateFavoriteSchema
} from "../../models/Contact.js"


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, validateBody(contactsAddSchema), contactsController.addContact);

contactsRouter.put("/:id", isValidId,  isEmptyBody, validateBody(contactsUpdadeSchema), contactsController.updateContactById);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact)

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactUpdateFavoriteSchema), contactsController.updateContactById);

export default contactsRouter;


