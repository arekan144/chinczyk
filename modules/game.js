const Database = require('./my_database_methods.js');

class Game {
    static roolDice = function (_, data) {
        return Math.floor(Math.random() * 6) + 1;
    }
    static changePlace = async (database, data) => {
        console.log(data);
        let dane = await Database.methods.findPlayer(database, data.id);
        console.log(dane);
        dane.positions

    }
}

module.exports = Game;