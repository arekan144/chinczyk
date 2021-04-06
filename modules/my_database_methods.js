import Datastore from 'nedb'

let methods = {
    newDataBase: function (name) {
        name = './db/' + name;
        return new Datastore({
            filename: name,
            autoload: true,
        })
    },
    insertInto: function (database, dane) {
        database.insert(dane)
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
        console.log("yes")
    },

}
let classes = {
    UzytkownikSesji: class {
        constructor(id, nick) {
            this.sessionid = id;
            this.nickname = nick;
        }
    },
    PokujSessji: class {
        gracze = new Array(4);
        iluJest = 0;
        dodajGracza(sesja) {
            if (this.iluJest < 4) {
                if (sesja != undefined && sesja != "")
                    this.gracze[this.iluJest++] = sesja;
                return true;
            }
            else {
                return false;
            }
        }
    }

}

export default { methods, classes };
