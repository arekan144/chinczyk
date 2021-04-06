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
    }
}

export default { methods, classes };
