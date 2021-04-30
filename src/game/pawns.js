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
        this.show = [false, false, false, false]
        this.tab = [false, false, false, false]
    }

    setValues = (userColor) => {
        this.userColor = userColor;
        // console.log(document.getElementById(userColor + 1));
        this.userPawns = [
            document.getElementById(userColor + 0), document.getElementById(userColor + 1),
            document.getElementById(userColor + 2), document.getElementById(userColor + 3)
        ]

        this.userPawns.forEach((paw, index) => {
            paw.onmouseover = () => {
                // console.log("over!", index)
                if (this.ileKropek != 0 && this.tab[index] && this.show[index] && this.intval) {
                    if (this.show[index].style.backgroundColor == "") this.show[index].style.boxShadow = "inset 0 0 10px " + this.userColor;
                    else if (this.show[index].style.backgroundColor.split(" ")[1] == "204,") this.show[index].style.boxShadow = "inset 0 0 10px black"
                    else this.show[index].style.boxShadow = "inset 0 0 10px white"
                    // console.log(this.show[index].style.backgroundColor.split(" "))
                }
            }
            paw.onmouseout = () => {
                // console.log("out", index)
                if (this.ileKropek != 0 && this.tab[index] && this.show[index] && this.intval) {
                    this.show[index].style.boxShadow = null;
                }
            }
            paw.onclick = () => {
                if (this.ileKropek != 0 && this.tab[index] && this.intval) {
                    clearInterval(this.inter)
                    this.intval = false;
                    for (var x = 0; x < 4; x++) {
                        this.userPawns[x].style.backgroundColor = this.userColor;
                        this.userPawns[x].style.cursor = null
                    }
                    this.show.forEach(element => {
                        if (element) {
                            element.style.boxShadow = null;
                        }
                    });
                    this.tab = [false, false, false, false]
                    this.show = [false, false, false, false]
                    this.porusz(index, this.ileKropek)
                }
            };
        })

    }
    porusz(num, oile) {
        // console.log(num, oile);
        this.ileKropek = 0;
        axios.post(addres.adres + "command", { command: "changePlace", id: this.id, num: this.numerPokoju, pionek: num, oile: oile }).then();
        document.getElementById("kostka").style.display = "none";
    }
    check = (data, pos, fin) => {
        // console.log(pos)
        // console.log(data);
        // console.log(data.num)
        let amove = [];
        if (this.ileKropek != 0)
            for (var x = 0; x < 4; x++) {

                switch (data.positions[x].absolute[0]) {
                    case "s":
                        if (this.ileKropek == 1 || this.ileKropek == 6) {
                            // console.log("Moge wyjsc")
                            this.tab[x] = true;
                            this.show[x] = pos[1 + (data.num * 10)];
                            amove.push(this.userPawns[x]);
                        } else {
                            this.tab[x] = false;
                            this.show[x] = false;
                            // console.log("Nie moge wyjsc!")
                        }
                        break;
                    case "f":
                        if (eval(data.positions[x].absolute.split("f")[1]) + this.ileKropek < 5) {
                            var czy = true;
                            for (var y = 0; y < 4; y++) {
                                if (data.positions[y].absolute == "f" + (eval(data.positions[x].absolute.split("f")[1]) + this.ileKropek))
                                    czy = false;
                            }
                            if (czy) {
                                this.tab[x] = true;
                                this.show[x] = fin[this.userColor][eval(data.positions[x].absolute.split("f")[1]) + this.ileKropek];
                                amove.push(this.userPawns[x]);
                            }
                            else {
                                this.tab[x] = false;
                                this.show[x] = false;
                            }
                        }
                        break;
                    default:
                        if (data.positions[x].relative + this.ileKropek <= 40) {
                            // console.log("Jest mniej od 40", data.positions[x].relative, data.positions[x].absolute)
                            this.tab[x] = true;
                            if ((data.positions[x].absolute + this.ileKropek) != 40)
                                this.show[x] = pos[(data.positions[x].absolute + this.ileKropek) % 40];
                            else this.show[x] = pos[40];
                            amove.push(this.userPawns[x]);
                        } else {
                            // console.log("Jest więcej niż 40", data.positions[x].relative, data.positions[x].absolute)

                            if ((data.positions[x].relative + this.ileKropek) % 40 < 5) {
                                // console.log("modulo wynosi:", (data.positions[x].relative + this.ileKropek) % 40)
                                let modulo = (data.positions[x].relative + this.ileKropek) % 40;
                                var czy = true;
                                for (var y = 0; y < 4; y++) {

                                    // console.log(data.positions[y].absolute, "--> " + y + " pionek", "f" + modulo);
                                    if (data.positions[y].absolute == "f" + modulo) {
                                        czy = false;
                                        // console.log("false!")
                                    }
                                }
                                if (czy) {
                                    this.tab[x] = true;
                                    this.show[x] = fin[this.userColor][modulo];
                                    amove.push(this.userPawns[x]);
                                } else {
                                    this.tab[x] = false;
                                    this.show[x] = false;
                                }
                            }
                            else {
                                this.tab[x] = false;
                                this.show[x] = false;
                            }

                        }
                        break;
                }
            }
        this.intval = true;
        if (amove.length != 0)
            amove.forEach(element => {
                element.style.cursor = "pointer"
                element.style.backgroundColor = "purple";
                setTimeout(() => {
                    element.style.backgroundColor = this.userColor;
                }, 500);
            })
        this.inter = setInterval(() => {
            // console.log("!")
            if (amove.length != 0)
                amove.forEach(element => {
                    element.style.cursor = "pointer"
                    element.style.backgroundColor = "purple";
                    setTimeout(() => {
                        element.style.backgroundColor = this.userColor;
                    }, 500);
                });
            else {
                this.intval = false;
                clearInterval(this.inter)
                this.tab = [false, false, false, false]
                this.show = [false, false, false, false]
                this.porusz(0, 0);
                document.getElementById("kostka").style.display = "none";
            }
        }, 1000);
    }

}
export default new Pawn;