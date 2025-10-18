import Item from '../models/search.model.js';
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
      const suggestions = await Item.findAll({
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

  async getDetails(searchQuery) {
    try {
      const results = await Item.findAll({
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
        order: [['title', 'ASC']]
      });

      return results;
    } catch (error) {
      throw new Error(`Failed to search items: ${error.message}`);
    }
  }
}

export default SearchService