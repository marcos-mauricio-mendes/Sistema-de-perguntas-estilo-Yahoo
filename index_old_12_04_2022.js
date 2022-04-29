// importando o express
const express = require("express");  
// iniciando o express 
const app = express();                

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');      
// Estou disendo para o Express utilizar arquivos estaticos na pasta public
app.use(express.static('public'));

app.get("/:nome/:lang",function(req,res){       // Função para responder ao servidor
    var nome = req.params.nome;                // Crinado Variavel nome 
    var lang = req.params.lang; 
    var exibirMsg = false;                     //Criando Variavel   true

                                             // Criando Array
    var produtos = [
    {nome: "Doritos", preco: 3},
     {nome: "Coca-Cola", preco: 5 }, 
     {nome:"leite",preco: 2 }, 
     {nome: "Carne", preco: 30},
     { nome: "Feijao", preco: 10},
     {nome: "Tody", preco: 100}

    ]


                     
    res.render("index",{                     // Carregando variaveis no index.ejs 
        nome: nome,
        lang: lang,
        empresa: "Guia do Programador",
        inscritos: 100001, 
        msg: exibirMsg,
        produtos: produtos
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