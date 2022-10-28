'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      consumer.hasMany(models.consumerSubChap, { foreignKey: 'consumerId' })
    }
  }
  consumer.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    expdate: DataTypes.DATE,
    dob: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    image: DataTypes.BLOB,
    status:BOOLEAN
  }, {
    sequelize,
    modelName: 'consumer',
  });
  return consumer;
};