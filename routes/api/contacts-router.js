import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody, validateBody} from "../../middlewares/index.js";

import {contactsAddSchema,
  contactsUpdadeSchema,} from "../../schemas/contact-schemas.js"



const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:id", contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, validateBody(contactsAddSchema), contactsController.addContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(contactsUpdadeSchema), contactsController.updateContactById);

contactsRouter.delete("/:id", contactsController.removeContact)



export default contactsRouter;


