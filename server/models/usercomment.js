'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        models.userComment.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        models.userComment.hasMany(models.userComment, { foreignKey: 'mainCommentId', as: 'replies'})
    }
  }
  userComment.init({
    userId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    isReply: DataTypes.BOOLEAN,
    mainCommentId: DataTypes.INTEGER,
    chapterId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userComment',
  });
  return userComment;
};