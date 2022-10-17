'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userCommentLikeDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userCommentLikeDislike.belongsTo(models.User, { foreignKey: 'userId',targetKey:'id' })
      userCommentLikeDislike.belongsTo(models.userComment, { foreignKey: 'commentId',targetKey:'id' })
      userCommentLikeDislike.belongsTo(models.consumer, { foreignKey: 'consumerId',targetKey:'id' })
      userCommentLikeDislike.belongsTo(models.consumerSubChap, { foreignKey: 'consumerSubChapId',targetKey:'id' })
    }
  }
  userCommentLikeDislike.init({
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    consumerId: DataTypes.INTEGER,
    consumerSubChapId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userCommentLikeDislike',
  });
  return userCommentLikeDislike;
};