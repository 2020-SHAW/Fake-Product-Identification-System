const Sequelize = require('sequelize');

const sequelize = new Sequelize('qr_code_system', 'root', '0r@cl3SQL', {
    host: 'localhost',
    dialect: 'mysql',
});

