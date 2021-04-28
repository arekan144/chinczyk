const e = require('express');
const Database = require('./my_database_methods.js');

class Game {
    static roolDice = function (_, data) {
        return Math.floor(Math.random() * 6) + 1;
    }
    static changePlace = async (database, data) => {
        console.log(data);
        let dane = await Database.methods.findPlayer(database, data.id);
        let all = await Database.methods.findRoom(database, dane.room)
        // console.log(dane, all);
        //data.pionek -> numer pionka
        //dane.num -> numer gracza!
        if (data.oile == 0) {
            return 0;
        }
        switch (dane.positions[data.pionek].absolute[0]) {
            case "s":
                if (data.oile == 6 || data.oile == 1) {
                    dane.positions[data.pionek].relative = 1;
                    dane.positions[data.pionek].absolute = 1 + eval(dane.num) * 10;
                    console.log("S")
                }
                break;
            case "f":
                if (eval(dane.positions[data.pionek].absolute[1]) + data.oile < 5) {
                    dane.positions[data.pionek].absolute = "f" + (eval(dane.positions[data.pionek].absolute[1]) + data.oile);
                    dane.positions[data.pionek].relative += data.oile;
                }
                console.log("F")
                break;
            default:
                if (dane.positions[data.pionek].relative + data.oile <= 40) {
                    if (dane.positions[data.pionek].absolute + data.oile <= 40) {
                        dane.positions[data.pionek].absolute += data.oile;
                    } else {
                        dane.positions[data.pionek].absolute += data.oile;
                        dane.positions[data.pionek].absolute %= 40;
                    }
                    dane.positions[data.pionek].relative += data.oile;
                } else {
                    if ((dane.positions[data.pionek].relative + data.oile) % 40 < 5) {
                        dane.positions[data.pionek].absolute = "f" + ((dane.positions[data.pionek].relative + data.oile) % 40);
                        dane.positions[data.pionek].relative += data.oile;
                    }
                }
                console.log("E")
                break;
        }

        all.forEach(gracz => {
            if (data.id != gracz._id && gracz.positions != undefined) {
                // console.log(gracz, "ten!")

                let czy = false;
                for (var x = 0; x < 4; x++) {
                    // console.log(gracz.positions[x].absolute, dane.positions[data.pionek].absolute, gracz.positions[x].absolute[0] != "s"
                    //     && gracz.positions[x].absolute[0] != "f")
                    if (gracz.positions[x].absolute == dane.positions[data.pionek].absolute && gracz.positions[x].absolute[0] != "s"
                        && gracz.positions[x].absolute[0] != "f"
                    ) {
                        console.log("OKKI")
                        czy = true;
                        gracz.positions[x].absolute = "s" + x;
                        gracz.positions[x].relative = 0;
                    }
                }
                if (czy) {
                    Database.methods.changePlayerData(database, gracz._id, { positions: gracz.positions })
                    console.log("ZBICIE!")
                }

            }
        });


        Database.methods.changePlayerData(database, data.id, { positions: dane.positions })
        // console.log(dane)
    }
}

module.exports = Game;