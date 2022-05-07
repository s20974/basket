const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_db', 'user', 'user', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;