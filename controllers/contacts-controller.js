// import * as contactsService from "../models/contacts.js";
import Contact from "../models/Contact.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

const listContacts = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

// const getById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const result = await contactsService.getContactById(id);
//         if (!result) {
//             throw HttpError(404, `Not found`);
//         }
//         res.status(200).json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// };

const add = async (req, res, next) => {
    try {
        const result = await Contact.create(req.body);
        if (!result) {
            throw HttpError(400, "missing required name field");
        }
        res.status(201).json(result)
    }
    catch (error) {
        next(error);
    }
};

// const updateById = async (req, res, next) => {
//     try {
//         const result = await contactsService.updateContactById(req.params.id, req.body);
//         if (!result) {
//             throw HttpError(404, "Not found");
//         }

//         res.status(200).json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// }

// const deleteById = async (req, res, next) => {
//     try {
     
//         const result = await contactsService.removeContact(req.params.id);
//         if (!result) {
//             throw HttpError(404, `Not found`);
//         }

//         res.json({
//             message: "Сontact deleted",
//         })
//     }
//     catch (error) {
//         next(error);
//     }
// };

export default {
    getListContacts: ctrlWrapper(listContacts),
    addContact: ctrlWrapper(add),
//   getContactById: ctrlWrapper(getById),
//   removeContact: ctrlWrapper(deleteById),
//   updateContactById: ctrlWrapper(updateById),
}