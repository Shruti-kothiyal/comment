'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class otp2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otp2.init({
    otp: DataTypes.STRING,
    expiration_time: DataTypes.DATE,
    consumerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'otp2',
  });
  return otp2;
};