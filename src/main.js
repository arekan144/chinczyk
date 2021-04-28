"use strict"
// plik main.js, wszystkie funkcje są wykonywane tutaj
import start from "./start.js";
import sync from "./sync.js";

class Blok {
    constructor(nick) {
        this.nick = nick;
    }
    dodajDane = (numPok, id) => {
        this.numerPokoju = numPok;
        this.id = id;
    }
}

window.onload = () => {
    let dane = new Blok(start);

    sync.getRoom(dane.nick).then((response) => {
        sync.id = response.data.id;
        console.log(response.data.id);
        // console.log(response.data)
        dane.dodajDane(response.data.numPok, response.data.id)

        sync.lang = response.data.lang
        sync.dodi = [dane.id, dane.numerPokoju];
        sync.refresh(dane.numerPokoju, dane.id, response.data.numer);

    });

}


