const Sequelize = require('sequelize');    // Utlizado para criar a tabela no banco de dados
const connection = require('./database');   // chamdo a conecção do banco
 
const Pergunta = connection.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});



Pergunta.sync({force: false}).then(() => {}); 

module.exports = Pergunta;


