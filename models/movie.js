'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre)
      Movie.belongsTo(models.Author)
      Movie.belongsTo(models.User)
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title cannot be empty"
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "synopsis cannot be empty"
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: "rating cannot be lower than 1"
        }
      }
    },
    GenreId: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (instance, option) => {
        instance.status = "active"
      }
    }, 
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};