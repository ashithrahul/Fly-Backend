import { successResponse, errorResponse } from '../utils/api.utils.js';

export default class SearchController {

     async getSuggestions(req, res) {
        try {
            const { q: searchQuery } = req.query;
            successResponse(res, 'Suggestions endpoint');
        } catch (error) {
            errorResponse(res);
        }

    }

     async searchDetails(req, res) {
        try {
            const { q: searchQuery } = req.query;
            successResponse(res, 'Search endpoint');
        } catch (error) {
            errorResponse(res);
        }
    }

}    