const express = require('express');
router = express.Router();
const Database = require('../modules/my_database_methods.js');
const game = require('../modules/game.js')
Database.methods.clearDataBase("uzytkownicy.db")


let dane = {
    uzytkownicy: Database.methods.newDataBase("uzytkownicy.db"),
    // pokoje: Database.methods.newDataBase("pokoje.db"),
    numerPokoju: 0,
    pokoje: [],
    //{ 1: [true, false, false, false] }
    // numerGracza: 0,
    czas: 60,
}

router.post("/", async (req, res) => {
    console.log("przychodzi!", req.body);
    while (3 < await Database.methods.countDataIn(dane.uzytkownicy, { room: dane.numerPokoju })) {
        dane.numerPokoju++;
    };
    var numerGracza = await Database.methods.countDataIn(dane.uzytkownicy, { room: dane.numerPokoju });
    //console.log("numer gracza:", numerGracza)
    // console.log("Wolne miejsce w ", dane.numerPokoju)
    var idGracza = await Database.methods.insertInto(dane.uzytkownicy, new Database.classes.UzytkownikSesji(req.body.nick, dane.numerPokoju, numerGracza));
    console.log(idGracza)
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify({ numPok: dane.numerPokoju, id: idGracza, numer: numerGracza }));
})

router.post("/data", async (req, res) => {
    //console.log("Potrzeba:", req.body)
    let data = await Database.methods.findRoom(dane.uzytkownicy, req.body.numerPokoju);

    //console.log(data)
    if (dane.pokoje[req.body.numerPokoju] != undefined) {
        data.push({ kolej: dane.pokoje[req.body.numerPokoju][0] })
    }
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify(data, null, 5))
})

router.post("/ready", async (req, res) => {
    console.log("Zmiana:", req.body.id, req.body.ready, req.body.room)
    Database.methods.changePlayerData(dane.uzytkownicy, req.body.id, { ready: req.body.ready })
    var ileGraczy = await Database.methods.countDataIn(dane.uzytkownicy, { room: eval(req.body.room) })
    if (ileGraczy > 1) {
        let data = await Database.methods.findRoom(dane.uzytkownicy, req.body.room);
        var start = true;
        data.forEach(element => {
            if (!element.ready)
                start = false
        });
        if (start) {
            console.log("start gry w pokoju", req.body.room)
            for (var x = 0; x < 4 - ileGraczy; x++)
                Database.methods.insertInto(dane.uzytkownicy, new Database.classes.PustyUzytkownik(req.body.room));
            dane.pokoje[req.body.room] = [0, ileGraczy];
        }
    }
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify({ serverState: "GOTCHA" }))
})

router.post("/command", async (req, res) => {
    console.log("Polecenie:", req.body.command, req.body.id, req.body.num);
    dane.czas = 0;
    if (req.body.command == "changePlace") {
        switch (dane.pokoje[req.body.num][0] + 1) {
            case (dane.pokoje[req.body.num][1]):
                dane.pokoje[req.body.num][0] = 0;
                break;
            default: dane.pokoje[req.body.num][0]++;
                break;
        }
        console.log(dane.pokoje[req.body.num])
    }

    let data = await game[req.body.command](dane.uzytkownicy, { id: req.body.id, num: req.body.num, pionek: req.body.pionek, oile: req.body.oile });
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify(data))
})
module.exports = router;