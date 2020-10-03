const express = require("express");
const app = express();

//Simular um banco de dados de usuários:
const users = []; //
let id = 1;


app.use(express.json()); //middlewear que a gente bota antes pra que a API consiga entender requests de json (ela faz um ".parseJSON")

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
    users.push(newUser);
    id++;
})

app.get("/users", (req,res) => {
    console.log('get users request');
    console.log(users);
    res.json(users)
})


app.listen(5000, () => {
    console.log("Server running on Port 5000");
})