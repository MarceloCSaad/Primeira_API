const express = require("express");
const app = express();
//express é a dependencia principal do NODE pra fazer servidores.
//VULGO: usado para criar e comunicar com servidores, APIs, etc
const bodyParser = require("body-parser");
//dependencia que traduz varios tipos de datas vindas do corpo da requisição http
const cors = require("cors");

const fs = require("fs"); //dependencia que ajuda a manipular e escrever arquivos (file systems)

app.use(cors());
app.use(bodyParser.json()); //middlewear que a gente bota antes pra que a API consiga entender requests de json (ela faz um ".parseJSON")
app.use(bodyParser.urlencoded({ extended:true })); //middlewear que permite que a gente receba formularios no corpo da requisição. Meu servidor vai ser capaz de parsear formulários

/*
//Simular um banco de dados de usuários:
const users = []; // array de users
let id = 1;
app.post("/users", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    //ou então apenas ===> const {name:name, email:email} = req.body;
    //e caso a sua chave e o seu valor tenham a mesma assinatura, pode simplificar ainda mais ===> const {name, email} = req.body;
    const newUser = {
        id:id,
        name:name,
        email:email,
        createdAt:Date.now().toString()
    };
    console.log(newUser);
    users.push(newUser);
    id++;
    res.send("fullfilled");
})
app.get("/users", (req,res) => {
    console.log('get users request');
    console.log(users);
    res.json(users);
})
*/

app.post("/users", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    //ou então apenas ===> const {name:name, email:email} = req.body;
    //e caso a sua chave e o seu valor tenham a mesma assinatura, pode simplificar ainda mais ===> const {name, email} = req.body;
    const newUser = {
        name:name,
        email:email
    };
    console.log(newUser);
    const rawData = fs.readFileSync("./DB/data.json"); //readFileSync vai ler um arquivo do DB (data.json), mas o output vem em formato Buffer, que é um 'formato meio bizarro de usar'
    const data = JSON.parse(rawData); //vai interpretar o arquivo saido do readFileSync
    //...resumindo, data vai terminar como um objeto, igual a: { users:[xxxxx] }
    data.users.push(newUser);
    const updatedUsers = JSON.stringify(data) //se antes nós transformamos o JSON em objeto java script agora pra enviar de volta temos que transformar o ob. java de volta em json
    fs.writeFileSync("./DB/data.json", updatedUsers); // escrevendo usuários atualizados no DB
    res.send("fullfilled");
})
app.get("/users", (req,res) => {
    const rawData = fs.readFileSync("./DB/data.json");
    const data = JSON.parse(rawData);
    res.send(data.users);
})


app.listen(5000, () => {
    console.log("Server running on Port 5000");
})