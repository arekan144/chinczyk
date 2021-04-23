import express from 'express';
import session from 'express-session';
import * as path from 'path';
import Database from './modules/my_database_methods.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var PORT = process.env.PORT || 80;

app.use(session({
    secret: 'session-key',
    resave: false,
    saveUninitialized: false,
}));
async function wyswietl_sesje() {
    return await Database.methods.readAllFrom(sesje)
}
app.get('/', function (req, res) {

    if (!req.session.userId) {
        console.log("Nowy User!")
        
        let nowyUzytkownik = new Database.classes.UzytkownikSesji(req.sessionID, "placeholder")
        Database.methods.insertInto(sesje, nowyUzytkownik)
        
    } else {
        console.log("Stary User!")
    }
    res.set({ 'Content-Type': 'text/html' });
    res.send(wyswietl_sesje)


    // console.log(req.session, req.sessionID)
    //res.set({ 'Content-Type': 'text/html' })


    //wyswietl_sesje();
}).listen(PORT, function () {
    console.log("PORT " + PORT + " włączony")
})
app.get("/src/main.js", (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.sendFile(path.join(__dirname + "/static/src/main.js"))
})
app.post("/", (req, res) => {
    console.log(req.body)
    console.log("przychodzi!")
})