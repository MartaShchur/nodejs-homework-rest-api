import User from "../models/User.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";


const signup = async (req, res) => {
    
}

export default {
    signup: ctrlWrapper(signup),
}
