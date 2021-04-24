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
    }
    setValues = (userColor) => {
        this.userColor = userColor;
        // console.log(document.getElementById(userColor + 1));
        this.userPawns = [
            document.getElementById(userColor + 0), document.getElementById(userColor + 1),
            document.getElementById(userColor + 2), document.getElementById(userColor + 3)
        ]
        // let blok = this;
        // for (var x = 0; x < this.userPawns.length; x++) {
        //     console.log(this.userPawns)
        //     this.userPawns[x].addEventListener('click', function () {
        //         if (blok.ileKropek != 0)
        //             console.log(this.id[this.id.length - 1], blok.ileKropek);
        //     })
        this.userPawns[0].onclick = () => {
            let num = 0;
            // console.log(num, this.ileKropek)
            clearInterval(this.inter)
            if (this.ileKropek != 0) {
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
            clearInterval(this.inter)
            if (this.ileKropek != 0) {
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
            clearInterval(this.inter)
            if (this.ileKropek != 0) {
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
            clearInterval(this.inter)
            if (this.ileKropek != 0) {
                for (var x = 0; x < 4; x++) {
                    this.userPawns[x].style.backgroundColor = this.userColor;
                    this.userPawns[x].style.cursor = null
                }
                this.porusz(num, this.ileKropek)
            }
        };
    }
    porusz(num, oile) {
        console.log(this.id, this.numerPokoju, num, oile);
        axios.post(addres.adres + "command", { command: "changePlace", id: this.id, num: this.numerPokoju, pionek: num, oile: oile }).then();
        document.getElementById("kostka").style.display = "none";
    }
    check = (data) => {
        console.log(data);

        let amove = [];
        for (var x = 0; x < 4; x++) {
            if (data.positions[x].relative[0] == "s") {
                console.log(x, "Jest na stracie!!!")
                if (this.ileKropek == 1 || this.ileKropek == 6) {
                    console.log("Moge wyjsc")
                    amove.push(this.userPawns[x]);
                } else {
                    console.log("Nie moge wyjsc!")
                }
            }
            else {
                console.log("Jestem poza!!")
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
                this.porusz(0, 0);
                document.getElementById("kostka").style.display = "none";

            }
        }, 1000);
    }

}
export default new Pawn;