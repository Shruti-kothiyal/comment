module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'name', {
        allowNull: false
      });
  },

  down: async (queryInterface) => {
    //await queryInterface.dropTable('users');
  },
};