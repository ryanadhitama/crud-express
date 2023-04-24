'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Book',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Book;
};

/**
 * @openapi
 * components:
 *    schemas:
 *      Book:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          created_at:
 *            type: date
 *          updated_at:
 *            type: date
 */
