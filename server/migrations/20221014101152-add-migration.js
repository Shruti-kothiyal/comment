'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "userId",
          {
            references: {
              model: "user",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "commentId",
          {
            references: {
              model: "userComment",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "consumerId",
          {
            references: {
              model: "consumer",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "consumerSubChapId",
          {
            references: {
              model: "consumerSubChap",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
