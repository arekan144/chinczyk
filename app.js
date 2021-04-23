const express = require('express');
const getr = require('./routes/get.js')
const postr = require('./routes/post.js')

const app = express();
var PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, function () {
    console.log("PORT " + PORT + " włączony")
})
app.use(express.static('./src'))
app.use(express.static('./gfx'))
app.use('/', getr)
app.use('/', postr)



// let uzytkownicy = Database.methods.newDataBase("uzytkownicy.db");
// let pokoje = Database.methods.newDataBase("pokoje.db")


// app.get('/', function (req, res) {
//     res.set({ 'Content-Type': 'text/html' });
//     res.sendFile(path.join(__dirname + "/static/index.html"));
// }).listen(PORT, function () {
//     console.log("PORT " + PORT + " włączony")
// })

// app.post("/", async (req, res) => {
//     console.log(req.body)
//     console.log("przychodzi!")
//     Database.methods.insertInto(uzytkownicy, new Database.classes.UzytkownikSesji(req.body.nick, licznik.pokuj))
//     console.log(licznik.graczy, licznik.pokuj)
//     if (licznik.graczy++ >= 3) {
//         licznik.graczy = 0;
//         licznik.pokuj++;
//     }
//     res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
//     res.send(JSON.stringify(req.body, null, 5))
// })
// app.post("/data", async (req, res) => {
//     let data = await Database.methods.findRoom(uzytkownicy, req.body.numerPokoju);
//     res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
//     res.send(JSON.stringify(data, null, 5))
// })
// app.get("/style.css", (req, res) => {
//     res.set({ 'Content-Type': 'text/css' })
//     res.sendFile(path.join(__dirname + "/static/style.css"))
// })