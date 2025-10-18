import { ERROR_MESSAGE, ERROR_STATUS, SUCCESSS_STATUS } from "../constants/api.constants.js";

export const errorResponse = (res, errorMessage=ERROR_MESSAGE,) => {
    return res.status(ERROR_STATUS).json({ error: errorMessage });
}

export const successResponse = (res, data) => {
    return res.status(SUCCESSS_STATUS).json(data);
}

