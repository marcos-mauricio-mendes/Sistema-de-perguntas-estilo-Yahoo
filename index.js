const express = require("express");            // importando o express
const app = express();                         // iniciando o express 
const bodyParser = require ("body-parser");    // Carregar o bodyPArser
const connection = require ("./database/database");  // Carregando a conecção com o Banco de Dados
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { ORDER } = require("mysql/lib/PoolSelector");

//Data base

connection
    .authenticate()
   .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine','ejs');                  // Estou dizendo para o Express usar o EJS como View engine
app.use(express.static('public'));            // Estou disendo para o Express utilizar arquivos estaticos na pasta public
// BODY PARSER
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

//-------ROTAS---------

// Função de resposta do BD
app.get("/",(req,res) => {  
    Pergunta.findAll({ raw: true, order:[
        ["id","DESC"] // ASC = Ordenação Crescente || DESC = Ordenação Decresente
    ]}).then(pergutas =>{ // Vai procurar todas as perguntas, SELECT All From
        res.render("index",{
            perguntas: pergutas
        });
    });    
    

});

 // Estou apotando para o arquivo /perguntar.ejs
app.get("/perguntar",(req, res) => {
    res.render("perguntar");

});

//Estou realizando o recebimento de dados do formulário utilizando o bodyParser
app.post("/salvarperguta",(req, res) => {
    var titulo =  req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao

    }).then(() => {
        res.redirect("/");
    }); 
});

// Defina a pagina das perguntas
app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id},
        
    }).then(pergunta => {
        if(pergunta !=undefined){ //pergunta localizada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[                     // Ordenando as respostas
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });

            });           
        }else{                   //pergunta não localizada       
            res.redirect("/");
        }

    });
})

// Estou criando a rota para salvar as informações na tabela resposta
app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId =  req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId);
    });

});


 // conectando ao servidor
app.listen(81,function(erro){                          
    if(erro){
        console.log("Ocorreu um erro!");                  //mesagem de erro do servidor
    }
    else{
        console.log("Servidor iniciado com sucesso!");   // mensagem de sucesso ao servidor

    }


})