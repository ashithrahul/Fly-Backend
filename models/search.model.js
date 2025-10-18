import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.utils.js';

const Search = sequelize.define('Search', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'items',
  indexes: [
    {
      type: 'FULLTEXT',
      fields: ['title']
    },
    {
      type: 'FULLTEXT',
      fields: ['description']
    },
    {
      type: 'FULLTEXT',
      fields: ['title', 'description']
    }
  ]
});

export default Search;