"use strict"
//PRZERÓB WSZYSTKIE OBJEKTY NA KLASY I WYTWÓRZ Z POWROTEM TE OBJEKTY JAKO POCHODNE TYCH CLASS (NEW CLASS)
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
        sync.dodi = [dane.id, dane.numerPokoju];
        sync.refresh(dane.numerPokoju, dane.id, response.data.numer);

    });

}

// setInterval(console.log(dane), 3000)
// setInterval(console.log(""), 3000)
// function call() {
//     console.log("Call");
//     setTimeout(function () { call() }, 3000)

// }
// call();
