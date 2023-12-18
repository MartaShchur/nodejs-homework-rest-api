import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
   const body = req.body;
  if (Object.keys(body).length === 0) {
    throw HttpError(400, 'missing fields');
  }
  next();
};

export default isEmptyBody;