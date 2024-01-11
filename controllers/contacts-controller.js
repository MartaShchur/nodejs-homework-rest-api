// import fs from "fs/promises";
// import path from "path";
import Contact from "../models/Contact.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const listContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({owner}, "-createdAt -updatedAt",{
    skip,
    limit,
  }).populate('owner', 'email');
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOne({_id, owner});
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await Contact.create({...req.body, avatar, owner});
        if (!result) {
            throw HttpError(400, "missing required name field");
        }
        res.status(201).json(result)
    }
    catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Movie.findOneAndUpdate({_id, owner}, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Movie.findOneAndDelete({_id, owner});
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json({
            message: "Сontact deleted",
        })
    }

    catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Movie.findOneAndUpdate({_id, owner}, req.body);
  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

export default {
    getListContacts: ctrlWrapper(listContacts),
    addContact: ctrlWrapper(add),
    getContactById: ctrlWrapper(getById),
    removeContact: ctrlWrapper(deleteById),
    updateContactById: ctrlWrapper(updateById),
    updateStatusContact:ctrlWrapper(updateStatusContact)
}