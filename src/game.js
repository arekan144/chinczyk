"use strict"
// wszystkie funkcje dotyczące samej gry
import players from "./players.js";

class Game {
    constructor() {
        this.id = 0;
        this.players_control = players
        this.finish = []
        this.start = []
        this.pawns = []
        this.dane = []
        this.num;
    }
    positons = () => {
        this.finish = {
            "#ff3333": [0, document.getElementById("1;5"), document.getElementById("2;5"), document.getElementById("3;5"), document.getElementById("4;5"),],
            "#3333ff": [0, document.getElementById("5;1"), document.getElementById("5;2"), document.getElementById("5;3"), document.getElementById("5;4"),],
            "#FFFF00": [0, document.getElementById("9;5"), document.getElementById("8;5"), document.getElementById("7;5"), document.getElementById("6;5"),],
            "#008000": [0, document.getElementById("5;9"), document.getElementById("5;8"), document.getElementById("5;7"), document.getElementById("5;6"),],
        }
        this.start = {
            "#ff3333": [document.getElementById("1;1"), document.getElementById("2;1"), document.getElementById("1;2"), document.getElementById("2;2"),],
            "#3333ff": [document.getElementById("8;1"), document.getElementById("9;1"), document.getElementById("8;2"), document.getElementById("9;2"),],
            "#FFFF00": [document.getElementById("8;8"), document.getElementById("9;8"), document.getElementById("8;9"), document.getElementById("9;9"),],
            "#008000": [document.getElementById("1;8"), document.getElementById("2;8"), document.getElementById("1;9"), document.getElementById("2;9"),],
        }
        for (var x = 0; x < 4; x++) {
            this.finish["#ff3333"][x + 1].style.backgroundColor = this.players_control.getPlayerColor(0)
            this.finish["#3333ff"][x + 1].style.backgroundColor = this.players_control.getPlayerColor(1)
            this.finish["#FFFF00"][x + 1].style.backgroundColor = this.players_control.getPlayerColor(2)
            this.finish["#008000"][x + 1].style.backgroundColor = this.players_control.getPlayerColor(3)

            this.start["#ff3333"][x].style.backgroundColor = this.players_control.getPlayerColor(0) + "80"
            this.start["#3333ff"][x].style.backgroundColor = this.players_control.getPlayerColor(1) + "80"
            this.start["#FFFF00"][x].style.backgroundColor = this.players_control.getPlayerColor(2) + "80"
            this.start["#008000"][x].style.backgroundColor = this.players_control.getPlayerColor(3) + "80"
        }
        this.positons = [
            0,
            document.getElementById("0;4"), document.getElementById("1;4"), document.getElementById("2;4"), document.getElementById("3;4"), document.getElementById("4;4"),
            document.getElementById("4;3"), document.getElementById("4;2"), document.getElementById("4;1"), document.getElementById("4;0"), document.getElementById("5;0"),
            document.getElementById("6;0"), document.getElementById("6;1"), document.getElementById("6;2"), document.getElementById("6;3"), document.getElementById("6;4"),
            document.getElementById("7;4"), document.getElementById("8;4"), document.getElementById("9;4"), document.getElementById("10;4"), document.getElementById("10;5"),
            document.getElementById("10;6"), document.getElementById("9;6"), document.getElementById("8;6"), document.getElementById("7;6"), document.getElementById("6;6"),
            document.getElementById("6;7"), document.getElementById("6;8"), document.getElementById("6;9"), document.getElementById("6;10"), document.getElementById("5;10"),
            document.getElementById("4;10"), document.getElementById("4;9"), document.getElementById("4;8"), document.getElementById("4;7"), document.getElementById("4;6"),
            document.getElementById("3;6"), document.getElementById("2;6"), document.getElementById("1;6"), document.getElementById("0;6"), document.getElementById("0;5"),
        ]
    }

    Blok = class {
        addClass = (it) => {
            this.blok.classList.add(it);
        }
        constructor(id, left, top) {
            this.blok = document.createElement("div");
            //console.log(this.blok)
            this.blok.id = id;
            this.blok.style.left = left;
            this.blok.style.top = top;
            this.blok.classList.add("blok");

        }
        changePlace(left, top) {
            this.blok.style.left = left;
            this.blok.style.top = top;
        }
    }
    createPlayersPawns = () => {
        for (let x = 0; x < this.players_control.numOfPlayers; x++) {
            this.pawns[x] = [
                new this.Blok(this.players_control.getPlayerColor(x) + "0", this.start[this.players_control.getPlayerColor(x)][0].style.left, this.start[this.players_control.getPlayerColor(x)][0].style.top),
                new this.Blok(this.players_control.getPlayerColor(x) + "1", this.start[this.players_control.getPlayerColor(x)][1].style.left, this.start[this.players_control.getPlayerColor(x)][1].style.top),
                new this.Blok(this.players_control.getPlayerColor(x) + "2", this.start[this.players_control.getPlayerColor(x)][2].style.left, this.start[this.players_control.getPlayerColor(x)][2].style.top),
                new this.Blok(this.players_control.getPlayerColor(x) + "3", this.start[this.players_control.getPlayerColor(x)][3].style.left, this.start[this.players_control.getPlayerColor(x)][3].style.top),
            ]
            for (let z = 0; z < 4; z++) {
                this.pawns[x][z].addClass("pionek");
                if (x != 2)
                    this.pawns[x][z].blok.style.backgroundColor = this.players_control.getPlayerColor(x)
                else
                    this.pawns[x][z].blok.style.backgroundColor = "#ffcc00"
                document.getElementById("plansza").append(this.pawns[x][z].blok);
            }
        }
    }
    createPlayingArea = (dane, num) => {
        this.num = num;
        console.log(dane, num, "dane przyszly")
        this.dane = dane;
        var obszarGry = document.getElementById("obszarGry");
        var plansza = document.createElement("div");
        plansza.id = "plansza";

        for (var x = 0; x < 11; x++) {
            for (var y = 0; y < 11; y++) {
                var blok = new this.Blok(x + ";" + y, x * 50 + "px", y * 50 + "px")
                switch (x) {
                    case 0: case 10:
                        if (y > 3 && y < 7)
                            blok.addClass("outline")
                        break;
                    case 1: case 2: case 3: case 7: case 8: case 9:
                        if (y > 3 && y < 7)
                            blok.addClass("outline")
                        break;
                    case 4: case 5: case 6:
                        if (y == 5 && x == 5) {
                            blok.blok.style.backgroundColor = "black"
                        } else
                            blok.addClass("outline")
                        break;
                }
                plansza.appendChild(blok.blok);
            }
        }
        obszarGry.appendChild(plansza)
        this.positons();
        this.createPlayersPawns();
        for (var x = 0; x < 40; x += 10) {
            //console.log(this.positons[1 + x])
            this.positons[1 + x].style.backgroundColor = this.players_control.getPlayerColor(x / 10) + "63"
        }
        //console.log(this.positons, this.finish)
    }
    refresh(data) {
        data.forEach(gracz => {
            // console.log(gracz)
            if (gracz.nickname != undefined && gracz.num != undefined) {
                var string = this.players_control.getPlayerColor(gracz.num)
                for (var x = 0; x < 4; x++) {
                    // console.log(gracz.positions)
                    let blok = document.getElementById(string + x)
                    // console.log(blok, x)
                    switch (gracz.positions[x].absolute[0]) {
                        case "s":
                            blok.style.left = this.start[string][gracz.positions[x].absolute[1]].style.left
                            blok.style.top = this.start[string][gracz.positions[x].absolute[1]].style.top
                            console.log("S", gracz.positions[x].absolute[1])
                            break;
                        case "f":

                            blok.style.left = this.finish[string][gracz.positions[x].absolute[1]].style.left
                            blok.style.top = this.finish[string][gracz.positions[x].absolute[1]].style.top

                            console.log("F", this.finish[string][gracz.positions[x].absolute[1]])
                            break;
                        default:
                            blok.style.left = this.positons[gracz.positions[x].absolute].style.left;
                            blok.style.top = this.positons[gracz.positions[x].absolute].style.top;
                            console.log("D")
                            break;
                    }
                }
            }
        });
    }
}

export default new Game;