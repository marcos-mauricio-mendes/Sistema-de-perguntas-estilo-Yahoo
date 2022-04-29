const Sequelize = require("sequelize");  // Estou Chamado o Squelize para utilizar a coneção com o Banco MySql

const connection = new Sequelize('guiaperguntas','root','123456',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
