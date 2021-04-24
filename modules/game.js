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
                dane.positions[data.pionek].relative = 1;
                dane.positions[data.pionek].absolute = 1 + eval(dane.num) * 10;
                console.log("S")
                break;
            case "f":
                break;
            default:
                dane.positions[data.pionek].relative += data.oile;

                if (dane.positions[data.pionek].absolute + data.oile <= 40) {
                    dane.positions[data.pionek].absolute += data.oile;
                } else {
                    dane.positions[data.pionek].absolute += data.oile;
                    dane.positions[data.pionek].absolute %= 40;
                }
                console.log("E")
                break;
        }
        Database.methods.changePlayerData(database, data.id, { positions: dane.positions })
        console.log(dane)
    }
}

module.exports = Game;