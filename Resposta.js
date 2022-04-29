const Sequelize = require('sequelize');  // Utlizado para criar a tabela no banco de dados
const connection = require('./database');
const Pergunta = require('./Pergunta');

const Resposta = connection.define('resposta',{
    corpo: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true

    },
    perguntaId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }

});

Resposta.sync({force: false}).then(() => {}); 
module.exports = Resposta;