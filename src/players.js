"use strict"

class Players {
    constructor() {
        this.player_ready = false
        this.koniec = false
        this.clickable = true
        this.numOfPlayers = 0;
    }
    getPlayerColor = function (num) {
        num = eval(num);
        switch (num) {
            case 0: return "#ff3333"
            case 1: return "#3333ff"
            case 2: return "#ffcc00"
            case 3: return "#008000"
            default: return "brown"
        }
    }
    updateQue = function (dane, nu) {
        if (!this.koniec) {
            // console.log(dane)
            for (var x = 0; x < ((dane.length < 4) ? 4 : dane.length); x++) {
                // console.log(x)
                //console.log(document.getElementById(x), document)
                if (dane[x] != undefined && dane[x].nickname != undefined) {
                    document.getElementById(dane[x].num + "g").innerHTML = dane[x].nickname
                    if (dane[x].num == nu) {
                        document.getElementById(dane[x].num + "g").style.textDecoration = "underline"
                    }
                    // console.log(dane[x].nickname, dane[x].num)
                    if (dane[x].ready) {
                        document.getElementById(dane[x].num + "g").parentElement.style.backgroundColor = this.getPlayerColor(dane[x].num)
                    }
                    else {
                        document.getElementById(dane[x].num + "g").parentElement.style.backgroundColor = "";
                    }
                }
                else {
                    if (x < 4) {
                        // console.log("Brak czegoś!")
                        if (document.getElementById(x + "g").innerHtml == "?")
                            document.getElementById(x + "g").innerHTML = "?";
                    }
                }
            }
            if (dane[4] != undefined) {
                this.koniec = true;
                for (let x = 0; x < 4; x++) {
                    if (dane[x].nickname != undefined) {
                        this.numOfPlayers++;
                    }
                }
            }
        } else {
            for (var x = 0; x < ((dane.length < 4) ? 4 : dane.length); x++) {
                if (dane[x].nickname != undefined) {
                    document.getElementById(dane[x].num + "g").parentElement.style.backgroundColor = this.getPlayerColor(dane[x].num);
                }

            }
            document.getElementsByClassName("readyState")[0].id = "ready"
        }
    }
    readyState = function () {
        if (this.clickable) {
            if (document.body.getElementsByClassName("readyState")[0].id != "ready") {
                // console.log("ready");
                document.body.getElementsByClassName("readyState")[0].id = "ready";
                this.player_ready = true;
                this.clickable = false;
            } else {
                // console.log("not ready");
                document.body.getElementsByClassName("readyState")[0].id = "";
                this.player_ready = false;
                this.clickable = false;
            }
            setTimeout(() => {
                this.clickable = true;
            }, 1000)
        }
    }
}

export default new Players;