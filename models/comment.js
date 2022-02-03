const Sequelize = require('sequelize');
const db = require('../config/connection');

const Comment = db.define('Comment', {
    comment: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
});

Comment.sync().then(() => {
    console.log('Comment Table in sync now');
});

module.exports = Comment;
