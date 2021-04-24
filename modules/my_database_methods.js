const Datastore = require('nedb');
const fs = require('fs');

let methods = {
    clearDataBase: function (name) {
        name = './db/' + name;
        fs.rm(name, { "recursive": true, }, (err) => {
            if (err) {
                return;
            }
        });
    },
    newDataBase: function (name) {
        name = './db/' + name;
        return new Datastore({
            filename: name,
            autoload: true,
        })
    },
    insertInto: function (database, dane) {
        return new Promise((resolve, reject) => {
            database.insert(dane, (err, doc) => {
                //console.log(doc._id)
                err ? reject(err) : resolve(doc._id)
            })
        })

    },
    readAllFrom: async function (database) {
        return new Promise((resolve, reject) => {
            database.find({}, (err, docs) => {
                err ? reject(err) : resolve(docs);
            });
        });
    },
    removeFromBase: function (database, string) {
        database.remove({ file: string }, {})
        //console.log("Done")
    },
    findRoom: async function (database, room) {
        return new Promise((resolve, reject) => {
            database.find({ room: eval(room) }, (err, docs) => {
                err ? reject(err) : resolve(docs);
            })
        })
    },
    countDataIn: async function (database, arr) {
        return new Promise((resolve, reject) => {
            database.count(arr, (err, docs) => {
                //console.log(docs)
                err ? reject(err) : resolve(docs);
            })
        })
    },
    findPlayer: async function (database, id) {
        return new Promise((resolve, reject) => {
            database.findOne({ _id: id }, (err, docs) => {
                err ? reject(err) : resolve(docs);
            })
        })
    },
    changePlayerData: async function (database, id, data) {
        return new Promise((resolve, reject) => {
            database.update({ _id: id }, { $set: data }, {}, function (err) {
                err ? reject(err) : resolve(true);
            })
        })
    }

}
let classes = {
    UzytkownikSesji: class {
        constructor(nick, roomNum, num) {
            //this.sessionid = id;
            this.nickname = nick;
            this.room = roomNum;
            this.num = num;
            this.ready = false;
            this.positions = []
            for (var x = 0; x < 4; x++) {
                this.positions.push({ absolute: "s" + x, relative: 0 });
            }
        }
    },
    PustyUzytkownik: class {
        static nickname = "-"
        static ready = true;
        constructor(roomNum) {
            this.room = roomNum;
        };
    }
}

module.exports = { methods, classes };
