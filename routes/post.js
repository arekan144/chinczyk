const express = require('express');
router = express.Router();
const Database = require('../modules/my_database_methods.js');
const game = new require('../modules/game.js')
Database.methods.clearDataBase("uzytkownicy.db")


let dane = {
    uzytkownicy: Database.methods.newDataBase("uzytkownicy.db"),
    numerPokoju: 0,
    pokoje: [],

    kickPlayer: async function (room, neu) {
        // let data = await Database.methods.findRoom(dane.uzytkownicy, room);
        // data.forEach(gracz => {
        //     if (gracz.num == neu) {
        //         Database.methods.changePlayerData(dane.uzytkownicy, gracz._id, Database.classes.UzytkownikSesji(room));
        //     }
        // })
    },
    interval: setInterval(function () {
        dane.pokoje.forEach((pokoj, index) => {
            if (pokoj[0] == "Koniec") {
                // console.log("Rozgrywka w " + index + " się zakończyła")
            } else {
                // console.log(pokoj)
                pokoj[3]--
                if (pokoj[3] == 0) {
                    // console.log("koniec! wyżucam gracza: " + pokoj[0] + " z pokoju numer: " + index);
                    pokoj[4].push(pokoj[0])
                    pokoj[3] = 60;
                    var czy = true;
                    let kroki = 0;
                    let nastepny;
                    pokoj[2]++;

                    if (pokoj[0] < pokoj[1] - 1) {
                        nastepny = pokoj[0] + 1;
                    }
                    else {
                        nastepny = 0;
                    }

                    // console.log(nastepny)

                    while (czy) {
                        kroki++;
                        czy = false;
                        pokoj[4].forEach(element => {
                            if (element == nastepny) {
                                czy = true;
                                nastepny++;
                                if (nastepny == pokoj[1]) {
                                    nastepny = 0;
                                }
                            }
                        });
                        if (kroki == 20) {
                            nastepny = "Koniec"
                            break
                        };

                    }
                    pokoj[0] = nastepny;
                    // dane.kickPlayer(index, pokoj[0])
                }
            }
        })
    }, 1000)
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
    console.log("id: ", idGracza)
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify({ numPok: dane.numerPokoju, id: idGracza, numer: numerGracza, lang: req.headers['accept-language'] }));
})

router.post("/data", async (req, res) => {
    //console.log("Potrzeba:", req.body)
    let data = await Database.methods.findRoom(dane.uzytkownicy, req.body.numerPokoju);

    //console.log(data)
    if (dane.pokoje[req.body.numerPokoju] != undefined) {
        data.push({ kolej: dane.pokoje[req.body.numerPokoju][0], debug: dane.pokoje[req.body.numerPokoju][2], wyzucone: dane.pokoje[req.body.numerPokoju][4], czas: dane.pokoje[req.body.numerPokoju][3] })
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
            dane.pokoje[req.body.room] = [0, ileGraczy, 0, 60, []];
        }
    }
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify({ serverState: "GOTCHA" }))
})

router.post("/command", async (req, res) => {
    console.log("Polecenie:", req.body.command, req.body.id, req.body.num);
    if (req.body.command == "changePlace" && dane.pokoje[req.body.num][0] != "koniec") {
        dane.pokoje[req.body.num][3] = 60;
        dane.pokoje[req.body.num][2]++;
        switch (dane.pokoje[req.body.num][0] + 1) {
            case (dane.pokoje[req.body.num][1]):
                var nastepny = 0;
                if (dane.pokoje[req.body.num][4].length != 0) {
                    var czy = true;
                    let kroki = 0;
                    while (czy) {
                        czy = false;
                        dane.pokoje[req.body.num][4].forEach(element => {
                            if (element == nastepny) {
                                czy = true;
                                nastepny++;
                                if (nastepny == dane.pokoje[req.body.num][1]) {
                                    nastepny = 0;
                                }
                            }
                        });
                        if (kroki == 20) {
                            nastepny = "Koniec"
                            break
                        };

                    }
                }
                dane.pokoje[req.body.num][0] = nastepny;
                break;
            default:
                var nastepny = dane.pokoje[req.body.num][0] + 1;
                if (dane.pokoje[req.body.num][4].length != 0) {
                    var czy = true;
                    let kroki = 0;
                    while (czy) {
                        kroki++;
                        czy = false;
                        dane.pokoje[req.body.num][4].forEach(element => {
                            if (element == nastepny) {
                                czy = true;
                                nastepny++;
                                if (nastepny == dane.pokoje[req.body.num][1]) {
                                    nastepny = 0;
                                }
                            }
                        });
                        if (kroki == 20) {
                            nastepny = "Koniec"
                            break
                        };

                    }
                }
                dane.pokoje[req.body.num][0] = nastepny;
                break;
        }
        console.log(dane.pokoje[req.body.num])
    }

    let data = await game[req.body.command](dane.uzytkownicy, { id: req.body.id, num: req.body.num, pionek: req.body.pionek, oile: req.body.oile });
    res.set({ 'Content-Type': 'aplication/json', 'Access-Control-Allow-Origin': '*' })
    res.send(JSON.stringify(data))
})



module.exports = router;