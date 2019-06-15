//
//$(document).ready(function () {

class character {
    name = "";
    img = "../unit-4-starwars-rpg/assets/images/";
    hp = 0;
    ap = 0;
    cp = 0;
    isHero = false;
    isEnemy = false;
    isDefender = false;

    constructor(charName, charImg) {
        this.name = charName;
        this.img += charImg;
        this.generatePoints();
    }

    generatePoints() {
        this.hp = Math.floor(Math.random() * (250 - 90 + 1)) + 90;
        this.ap = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        this.cp = Math.floor(Math.random() * (20 - 35 + 1)) + 35;
    };

    attack(times) {
        return this.ap * times;
    };

    counterAttack() {
        return this.cp;
    };
};

var anakin = new character("Anakin", "anakin.png");
var darth = new character("Darth Vader", "darth.png");
var yoda = new character("Yoda", "yoda.png");
var obiwan = new character("Obi Wan", "obiwan.png");

var characteres = [anakin, darth, yoda, obiwan];

function linkCharacters(player, charac, pos) {
    $("#" + player + "Name" + pos).text(charac.name);
    $("#" + player + "Image" + pos).attr("src", charac.img);
    $("#" + player + "HP" + pos).text(charac.hp);
}

var yourPlayerDiv = $("#hook");

for (var i = 0; i < characteres.length; i++) { //
    var newCharDiv = $("<button id=\"player" + i + "\" class=\"newCard\">" +
        "<div class=\"card text-center\">" +
        "<div class=\"card-header\">" +
        "<h5 id=\"charName" + i + "\"></h5>" +
        "</div>" +
        "<div class=\"card-body\">" +
        "<p class=\"card-text\"><img id=\"charImage" + i + "\" src=\"\"></p>" +
        "</div>" +
        "<div class=\"card-footer\">" +
        "<h5 id=\"charHP" + i + "\"></h5>" +
        "</div>" +
        "</div>" +
        "</button>");
    yourPlayerDiv.append(newCharDiv);
}
$(".newCard button").css('display', 'inline-block');

for (var index = 0; index < characteres.length; index++) {
    linkCharacters("char", characteres[index],index );
}




//});