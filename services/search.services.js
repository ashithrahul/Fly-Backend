import Search from '../models/search.model.js';
import { Op } from 'sequelize';

//Search Service - all db releated opertion
class SearchService {
  constructor() {
    // initialised in constructor only one instance exists
    if (SearchService.instance) {
      return SearchService.instance;
    }
    SearchService.instance = this;
  }

  // Get search suggestions based on title matching
  async getSuggestions(searchQuery) {
    try {
      const suggestions = await Search.findAll({
        attributes: ['title'],
        where: {
          title: {
            [Op.like]: `%${searchQuery}%`
          }
        },
        limit: 10,
        order: [['title', 'ASC']]
      });

      // Return only title strings
      return suggestions.map(item => item.title);
    } catch (error) {
      throw new Error(`Failed to fetch suggestions: ${error.message}`);
    }
  }

  // Get detailed search results with pagination
  async getDetails(searchQuery, pageNum = 1, limit = 10) {
    try {
      // Calculate pagination offset
      const offset = (pageNum - 1) * limit;
      const { count, rows } = await Search.findAndCountAll({
        where: {
          // Search in both title and description
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              description: {
                [Op.like]: `%${searchQuery}%`
              }
            }
          ]
        },
        attributes: ['id', 'title', 'description', 'image'],
        order: [['title', 'ASC']],
        limit,
        offset
      });
      const totalPages = Math.ceil(count / limit);

      // Return results with pagination metadata
      return { totalPages, results: rows, pagination :{
          page: pageNum,
          limit: limit,
          total: count,
          totalPages: totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
      } };
    } catch (error) {
      throw new Error(`Failed to search items: ${error.message}`);
    }
  }
}

export default SearchService