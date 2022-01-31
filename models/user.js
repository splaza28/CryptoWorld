const Sequelize = require('sequelize');
const db = require('../config/database');

const Userdata = db.define('Userdata', {
  fullname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  hashPassword: {
    type: Sequelize.STRING
  },
});

Userdata.sync().then(() => {
  console.log('Userdata Table in sync now');
});

module.exports = Userdata;
