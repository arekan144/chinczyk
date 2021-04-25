"use strict"

import addres from "../addres.js";

class Pawn {
    constructor() {
        this.userPawns = [];
        this.userColor = null;
        this.ileKropek = 0;
        this.inter = "";
        this.id = "";
        this.numerPokoju = "";
        this.tab = [false, false, false, false]
    }


    setValues = (userColor) => {
        this.userColor = userColor;
        // console.log(document.getElementById(userColor + 1));
        this.userPawns = [
            document.getElementById(userColor + 0), document.getElementById(userColor + 1),
            document.getElementById(userColor + 2), document.getElementById(userColor + 3)
        ]
        this.userPawns[0].onclick = () => {
            let num = 0;
            if (this.ileKropek != 0 && this.tab[num]) {
                console.log(this.tab[num])
                clearInterval(this.inter)
                for (var x = 0; x < 4; x++) {
                    this.userPawns[x].style.backgroundColor = this.userColor;
                    this.userPawns[x].style.cursor = null
                }
                this.porusz(num, this.ileKropek)
            }
        };
        this.userPawns[1].onclick = () => {
            let num = 1;
            // console.log(num, this.ileKropek)

            if (this.ileKropek != 0 && this.tab[num]) {
                console.log(this.tab[num])
                clearInterval(this.inter)
                for (var x = 0; x < 4; x++) {
                    this.userPawns[x].style.backgroundColor = this.userColor;
                    this.userPawns[x].style.cursor = null
                }
                this.porusz(num, this.ileKropek)
            }
        };
        this.userPawns[2].onclick = () => {
            let num = 2;
            // console.log(num, this.ileKropek)

            if (this.ileKropek != 0 && this.tab[num]) {
                console.log(this.tab[num])
                clearInterval(this.inter)
                for (var x = 0; x < 4; x++) {
                    this.userPawns[x].style.backgroundColor = this.userColor;
                    this.userPawns[x].style.cursor = null
                }
                this.porusz(num, this.ileKropek)
            }
        };
        this.userPawns[3].onclick = () => {
            let num = 3;
            // console.log(num, this.ileKropek)
            if (this.ileKropek != 0 && this.tab[num]) {
                console.log(this.tab[num])
                clearInterval(this.inter)
                for (var x = 0; x < 4; x++) {
                    this.userPawns[x].style.backgroundColor = this.userColor;
                    this.userPawns[x].style.cursor = null
                }
                this.porusz(num, this.ileKropek)
            }
        };
    }
    porusz(num, oile) {
        console.log(num, oile);
        this.ileKropek = 0;
        axios.post(addres.adres + "command", { command: "changePlace", id: this.id, num: this.numerPokoju, pionek: num, oile: oile }).then();
        document.getElementById("kostka").style.display = "none";
    }
    check = (data) => {
        // console.log(data);

        let amove = [];
        for (var x = 0; x < 4; x++) {

            switch (data.positions[x].absolute[0]) {
                case "s":
                    if (this.ileKropek == 1 || this.ileKropek == 6) {
                        // console.log("Moge wyjsc")
                        this.tab[x] = true;
                        amove.push(this.userPawns[x]);
                    } else {
                        this.tab[x] = false;
                        // console.log("Nie moge wyjsc!")
                    }
                    break;
                case "f":
                    if (eval(data.positions[x].absolute[1]) + this.ileKropek < 5) {
                        var czy = true;
                        for (var y = 0; y < 4; y++) {
                            if (data.positions[y].absolute == "f" + (eval(data.positions[x].absolute[1]) + this.ileKropek))
                                czy = false;
                        }
                        if (czy) {
                            this.tab[x] = true;
                            amove.push(this.userPawns[x]);
                        }
                        else this.tab[x] = false;
                    }
                    break;
                default:
                    if (data.positions[x].relative + this.ileKropek <= 40) {
                        this.tab[x] = true;
                        amove.push(this.userPawns[x]);
                    } else {
                        if ((data.positions[x].relative + this.ileKropek) % 40 < 5) {
                            var czy = true;
                            for (var y = 0; y < 4; y++) {
                                if (data.positions[y].absolute == "f" + ((eval(data.positions[x].absolute[1]) + this.ileKropek) % 40))
                                    czy = false;
                            }
                            if (czy) {
                                this.tab[x] = true;
                                amove.push(this.userPawns[x]);
                            } else this.tab[x] = false;
                        }
                        else this.tab[x] = false;

                    }
                    break;
            }
        }
        this.inter = setInterval(() => {
            console.log("leci interval")
            if (amove.length != 0)
                amove.forEach(element => {
                    element.style.cursor = "pointer"
                    element.style.backgroundColor = "purple";
                    setTimeout(() => {
                        element.style.backgroundColor = this.userColor;
                    }, 500);
                });
            else {
                clearInterval(this.inter)
                this.tab = [false, false, false, false]
                this.porusz(0, 0);
                document.getElementById("kostka").style.display = "none";
            }
        }, 1000);
    }

}
export default new Pawn;