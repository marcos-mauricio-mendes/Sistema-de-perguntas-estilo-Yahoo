const express = require("express");   // importando o express
const app = express();               // iniciando o express 


app.set('view engine', 'ejs');      // Estou dizendo para o Express usar o EJS como View engine


app.get("/:nome/:lang",function(req,res){       // Função para responder ao servidor
    var nome = req.params.nome;                // Crinado Variavel nome 
    var lang = req.params.lang;               // Crinado Variavel  lang
    res.render("index",{                     // Carregando variaveis no index.ejs 
        nome: nome,
        lang: lang,
        empresa: "Guia do Programador",
        inscritos: 100000

    });

});

app.listen(1000,function(erro){                           // conectando ao servidor
    if(erro){
        console.log("Ocorreu um erro!");                  //mesagem de erro do servidor
    }
    else{
        console.log("Servidor iniciado com sucesso!");   // mensagem de sucesso ao servidor

    }


})