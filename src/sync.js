"use strict"


// import axios from "axios"
import game from "./game.js"
import dice from "./game/dice.js";
import pawn from "./game/pawns.js";
import address from "./addres.js"
// plik zajmuje się przedewszysktim synchornizacją z serwerem
class Sync {
    constructor() {
        this.dane = [];
        this.id = "";
        this.dodi = [];
        this.numer = "";
        this.stary = false;
        this.debug = -1;
        this.lang;
    }
    requestData = async (npk) => {
        return await axios.post(address.adres + "data", npk)
    }
    getRoom = async (nick) => {
        var data = await axios.post(address.adres, { nick: nick })
        return data;
    }
    changeReadyState = async (pak) => {
        // console.log(pak)
        var data = await axios.post(address.adres + "ready", pak)
        return data;
    }
    refresh = (num, id, once) => {
        // console.log("Tutaj")
        if (once != undefined) {
            // console.log(once, "ONCE")
            this.numer = once;
        }
        if (game.players_control.player_ready != this.stary && game.players_control.clickable) {
            this.changeReadyState({ id: id, ready: game.players_control.player_ready, room: num })
            this.stary = !this.stary
            setTimeout(() => {
                this.requestData({ numerPokoju: num }).then((response) => {
                    this.dane = response.data;
                    //console.log(this.dane)
                    //console.log(game.players_control.player_ready)
                    game.players_control.updateQue(this.dane)
                    if (this.dane[4] != undefined && document.getElementById("plansza") == undefined)
                        game.createPlayingArea();
                })
            }, 300)
        }
        let ref = this.refresh
        this.requestData({ numerPokoju: num }).then((response) => {
            this.dane = response.data;
            // console.log(this.dane, "ref!!!")
            //console.log(game.players_control.player_ready)
            game.players_control.updateQue(this.dane, this.numer)
            if (this.dane[4] != undefined && document.getElementById("plansza") == undefined && !game.koniec) {
                game.createPlayingArea(this.dane, this.numer);
                pawn.setValues(game.players_control.getPlayerColor(this.numer));
            } else if (document.getElementById("plansza")) {
                if (document.getElementById("kostka") == null) {
                    pawn.setValues(game.players_control.getPlayerColor(this.numer));
                    //console.log(this.id)
                    pawn.id = this.id;
                    pawn.numerPokoju = this.dodi[1];
                    // console.log(this.lang)
                    dice.createDice(this.dodi, this.lang);
                    if (dice.kostka) {
                        dice.kostka.addEventListener("click", async function () {

                            if (this.style.backgroundImage == "") {

                                let dane = "";
                                sync.dane.forEach(element => {
                                    if (element.num == sync.numer)
                                        dane = element;
                                });
                                clearInterval(pawn.inter)
                                pawn.ileKropek = await dice.getDice();
                                // console.log(pawn.ileKropek)
                                pawn.check(dane, game.positons, game.finish);


                            }

                        })
                    }
                }
                // console.log(this.dane)
                if (this.debug != this.dane[4].debug) {
                    // console.log("wcześniej: " + this.debug, "teraz", this.dane[4].debug)
                    this.debug = this.dane[4].debug

                    for (var x = 0; x < 4; x++) {
                        // console.log(x, this.dane[4].kolej)
                        if (this.dane[4].kolej == x)
                            document.getElementById(x + "g").parentElement.style.boxShadow = "inset 0 0 3px white, 0 0 3px black";
                        else
                            document.getElementById(x + "g").parentElement.style.boxShadow = "";
                    }
                    document.getElementById("czasomierz").style.backgroundColor = game.players_control.getPlayerColor(this.dane[4].kolej)
                    if (this.dane[4].kolej == this.numer && !game.koniec) {
                        document.getElementById("kostka").style.backgroundImage = "";
                        document.getElementById("kostka").style.display = "block";
                    }
                    else {
                        document.getElementById("kostka").style.display = "";
                        document.getElementById("kostka").style.backgroundImage = "";
                    }
                }
                game.refresh(this.dane)
            }
            setTimeout(function () {
                if (!game.koniec) ref(num, id);
                else {
                    if (game.koniec != true)
                        game.zakoncz();
                    else
                        game.wyrzucono();
                    // console.log(this.dane)
                    // this.dane[4].kolej = 'Koniec';
                    document.getElementById("kostka").style.display = "";
                    document.getElementById("kostka").style.backgroundImage = "pyt.png";
                }
            }, 2000);

        })
    }
    wykonaj() {
        document.body.getElementsByClassName("readyState")[0].onclick = () => {
            if (this.dane[4] == undefined) game.players_control.readyState()
        }
    }
}
let sync = new Sync;
sync.wykonaj();

export default sync;