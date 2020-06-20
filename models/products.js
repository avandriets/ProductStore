const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Model = Sequelize.Model;

class Products extends Model {
}

Products.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 200],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 500],
    },
  },
}, {
  sequelize,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  modelName: 'products',
});

module.exports = Products;
