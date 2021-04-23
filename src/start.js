"use strict"
// funkcje startu, zapytanie o imie, itp.
class start {
    constructor() {
        this.nick = ""
    }
    static greet = function () {
        do {
            this.nick = prompt("Podaj nick!")
        } while (this.nick == "" || this.nick == null || this.nick == " " || this.nick.length < 2)
        return 0;
    }
}
start.greet();

export default start.nick;