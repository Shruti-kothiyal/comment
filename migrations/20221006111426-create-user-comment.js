'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isReply: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mainCommentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chapterId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.changeColumn('userComments',
    // "userId",{
    //   type: Sequelize.INTEGER,
    //   unique: true,
    //   allowNull: false,
    // },
    // "body",{
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // "isReply",{
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // "mainCommentation", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // "chapterId",{
    //   type: Sequelize.STRING,
    //   unique: true,
    //   allowNull: false,
    // },
    // )
  }
};