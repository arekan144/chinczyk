"use strict"

import addres from "../addres.js"

class Dice {
    constructor() {
        this.data = []
    }
    getDice = async () => {
        // console.log(await axios.post("http://localhost:4000/command", { command: "roolDice", id: id, num: num }))

        this.data = await axios.post(addres.adres + "command", { command: "roolDice", id: this.id, num: this.num })
        document.getElementById("kostka").style.backgroundImage = 'url("./' + this.data.data + '.png")'
        // console.log(this.data.data)
        return this.data.data;

    }
    createDice = (duo) => {
        console.log("dice")
        this.id = duo[0];
        this.num = duo[1];
        this.kostka = document.createElement("div");
        this.kostka.id = "kostka";
        // kostka.innerHTML = "?";
        document.getElementById("obszarGry").append(this.kostka);
    }
}
export default new Dice;