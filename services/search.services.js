import Search from '../models/search.model.js';
import { Op } from 'sequelize';
class SearchService {
  constructor() {
    if (SearchService.instance) {
      return SearchService.instance;
    }
    SearchService.instance = this;
  }

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

      return suggestions.map(item => item.title);
    } catch (error) {
      throw new Error(`Failed to fetch suggestions: ${error.message}`);
    }
  }

  async getDetails(searchQuery, pageNum = 1, limit = 10) {
    try {
      const offset = (pageNum - 1) * limit;
      const { count, rows } = await Search.findAndCountAll({
        where: {
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