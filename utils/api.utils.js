import { ERROR_MESSAGE, ERROR_STATUS, SUCCESSS_STATUS } from "../constants/api.constants.js";

export const errorResponse = (res, errorMessage=ERROR_MESSAGE, statusCode=ERROR_STATUS) => {
    return res.status(statusCode).json({ error: errorMessage });
}

export const successResponse = (res, data, statusCode=SUCCESSS_STATUS) => {
    return res.status(statusCode).json(data);
}

