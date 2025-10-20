import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.utils.js';

//Search Model [Items used search for naming convension] - defines the database structure for items stored
const Search = sequelize.define('Search', {
  // Primary key field
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Item title - required field with validation
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  // Item description - optional text field
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Item image URL - optional with URL validation
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  // Maps to 'items' table in database
  tableName: 'items',
  // using title and description for filtering
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