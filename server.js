import express from 'express';
import session from 'express-session';
import Datastore from 'nedb';
import { join } from 'path';
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var PORT = process.env.PORT || 80;

var baza_sesji = new Datastore({
    filename: 'db/sesje.db',
    autoload: true,
});

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: false,
}));

class UzytkownikSesji {
    constructor(id, nick) {
        this.sessionid = id;
        this.nickname = nick;
    }
}

var pokoje = null;

function dalej(info, req, res) {
    if (info) {
        console.log("nie ma sesji!")
        var nowyUser = new UzytkownikSesji(req.sessionID, "Placeholder")
        baza_sesji.insert(nowyUser, function (err, newUsr) {
            console.log("dodano gracza:", newUsr)
        })
        baza_sesji.find({}, function (err, all) {
            pokoje = [...all]
            dalej(false, req, res)
        })
    } else {
        wyslijDane(pokoje, req, res)
    }

    return 0;
}

function wyslijDane(pokoje, req, res) {
    console.log("jest taka sesja")
    res.set('Content-Type', 'text/html')
    // res.send(JSON.stringify(pokoje, null, 5))
    res.sendFile(join(__dirname + "/static/index.html"))
}


app.get('/', function (req, res) {
    // console.log(req.session, req.sessionID)
    baza_sesji.findOne({ sessionid: req.sessionID }, function (err, doc) {
        console.log(doc == null)
        dalej(doc == null, req, res);
    });

}).listen(PORT, function () {
    console.log("PORT " + PORT + " włączony")
})
app.get("/src/main.js", (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.sendFile(join(__dirname + "/static/src/main.js"))
})
app.post("/", (req, res) => {
    console.log(req.body)
    console.log("przychodzi!")
})