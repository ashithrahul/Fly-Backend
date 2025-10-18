import { successResponse, errorResponse } from '../utils/api.utils.js';
import SearchService from './../services/search.services.js';

export default class SearchController {

    constructor() {
        this.searchService = new SearchService();
    }

     async getSuggestions(req, res) {
        try {
            const { q: searchQuery } = req.query;
             const suggestions = await this.searchService.getSuggestions(
                searchQuery, 
                10
            );
            successResponse(res, suggestions,'Suggestions endpoint');
        } catch (error) {
            console.log('Error in getSuggestions:', error);
            errorResponse(res);
        }

    }

     async searchDetails(req, res) {
        try {
            const { q: searchQuery } = req.query;
            const details = await this.searchService.getDetails(searchQuery);
            successResponse(res, details, 'Search endpoint');
        } catch (error) {
            errorResponse(res);
        }
    }

}    