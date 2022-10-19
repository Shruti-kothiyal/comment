"use strict";
const { Model } = require("sequelize");


const func = (sequelize, DataTypes) => {
  class otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otp.init(
    {
      otp: DataTypes.STRING,
      userId:DataTypes.INTEGER,
      expiration_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "otp",
    }
  );
  return otp;
};

module.exports = func;
