// linking sequelize
const { Model, DataTypes } = require('sequelize');
// linking database
const sequelize = require('../config/connection');

// creating new comment class from sequlize model format
class Comment extends Model {}


// creating first comment instance
Comment.init(
    {
      // setting id
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // setting text
      comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
        // setting id
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      // setting post id
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );

module.exports = Comment;