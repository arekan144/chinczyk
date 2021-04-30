"use strict"

import addres from "../addres.js"

class Dice {
    constructor() {
        this.data = []
        this.jezyki = [];
        this.lang;
    }
    getDice = async () => {
        this.data = await axios.post(addres.adres + "command", { command: "roolDice", id: this.id, num: this.num })
        document.getElementById("kostka").style.backgroundImage = 'url("./' + this.data.data + '.png")'
        // console.log(this.data.data)
        var utterThis = new SpeechSynthesisUtterance(this.data.data)
        utterThis.voice = this.jezyki[0];
        window.speechSynthesis.speak(utterThis);

        return this.data.data;
    }
    setSpeach() {

        let s = new Promise(
            function (resolve, reject) {
                let synth = window.speechSynthesis;
                let id;

                id = setInterval(() => {
                    if (synth.getVoices().length !== 0) {
                        resolve(synth.getVoices());
                        clearInterval(id);
                    }
                }, 10);
            })

        s.then((voices) =>
            voices.forEach(element => {
                if (element.lang.search(this.lang) != -1)
                    this.jezyki.push(element)
            })

        )
        // console.log(this.jezyki)
    }
    createDice = (duo, lang) => {
        // console.log("dice")
        this.lang = lang.split(",")[0];
        this.setSpeach();
        this.id = duo[0];
        this.num = duo[1];
        this.kostka = document.createElement("div");
        this.kostka.id = "kostka";
        // kostka.innerHTML = "?";
        document.getElementById("obszarGry").append(this.kostka);
    }
}
export default new Dice;