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
    powerImprove = 1;
    isDead = false;

    constructor(charName, charImg) {
        this.name = charName;
        this.img += charImg;
        this.generatePoints();
    }

    setHero() {
        this.isHero = true;
    };

    setDefender() {
        this.isDefender = true;
    };

    setEnemy() {
        this.isEnemy = true;
    };

    generatePoints() {
        this.hp = Math.floor(Math.random() * (250 - 90 + 1)) + 90;
        this.ap = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        this.cp = Math.floor(Math.random() * (20 - 35 + 1)) + 35;
    };

    attack() {
        var totAtack = this.ap * this.powerImprove;
        //console.log("AP "+this.ap);
        //console.log("PI "+this.powerImprove);     
        //console.log("atcki "+totAtack);
        this.powerImprove++;
        return parseInt(totAtack);
    };

    counterAttack() {
        return this.cp;
    };

    receiveAttack(atck) {
        //console.log("receive ATK "+atck);
        //console.log("HP "+this.hp);
        this.hp = this.hp - atck;
        //console.log("HP "+this.hp);
    };

    isAlive() {
        if (this.hp > 0) {
            return true;
        } else {
            this.hp = 0;
            this.isDead = true;
            return false;
        }
    };

};

var anakin = new character("Anakin", "anakin.png");
var darth = new character("Darth Vader", "darth.png");
var yoda = new character("Yoda", "yoda.png");
var obiwan = new character("Obi Wan", "obiwan.png");

var heroSelected;
var defenderSelected;

var characteres = [anakin, darth, yoda, obiwan];
var enemies;

function linkCharacters() {
    for (var index = 0; index < characteres.length; index++) {
        $("#charName" + index).text(characteres[index].name);
        $("#charImage" + index).attr("src", characteres[index].img);
        $("#charHP" + index).text(characteres[index].hp);
    }
}

function toggleClasses(hook, className) {

}

var yourPlayerDiv = $("#hookCharac");
var yourEnemiesDiv = $("#hookEnemies");
var yourDefenderDiv = $("#hookDefender");


for (var i = 0; i < characteres.length; i++) { //
    var newCharDiv = $("<button id=\"player" + i + "\" class=\"newCardChar\" value=\"" + i + "\">" +
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
$(".newCardChar button").css('display', 'inline-block');

linkCharacters();

$(".newCardChar").on("click", function () {

    var hero;
    var defender;

    heroSelected = this;

    for (var i = 0; i < characteres.length; i++) {
        var tempPlayer = document.getElementById("player" + i);
        if (!(heroSelected.value == tempPlayer.value)) {
            $("#player" + i).clone().appendTo(yourEnemiesDiv);
            $("#player" + i).remove();
            $("#player" + i).toggleClass("enemiesGroup", true);
            $("#player" + i).toggleClass("newCardChar", false);
        }
    }

    hero = characteres[parseInt(heroSelected.value)];
    hero.setHero();

    $(".enemiesGroup").on("click", function () {
        defenderSelected = this;
        for (var i = 0; i < characteres.length; i++) {
            if (!characteres[i].isDead) {
                var tempPlayer = document.getElementById("player" + i);
                if ((defenderSelected.value == tempPlayer.value) && (!(heroSelected.value == tempPlayer.value))) {
                    $("#player" + i).clone().appendTo(yourDefenderDiv);
                    $("#player" + i).remove();
                    $("#player" + i).toggleClass("defenderGroup", true);
                    $("#player" + i).toggleClass("enemiesGroup", false);
                }
            }
        }

        defender = characteres[parseInt(defenderSelected.value)];
        defender.setDefender();

        $("#attackBtn").on("click", function () {
            if ((defender.isAlive()) && (hero.isAlive())) {
                defender.receiveAttack(hero.attack());
                if (defender.isAlive) {
                    hero.receiveAttack(defender.counterAttack());
                    hero.isAlive();
                }
            }
            linkCharacters();
            if (!defender.isAlive()) {
                console.log("You WIN");
                console.log("Select another enemy");
                $("#player" + defenderSelected.value).remove();
            }
            if (!hero.isAlive()) {
                console.log("You LOSE");
                console.log("Play again?");
                //$("#player" + defenderSelected.value).remove();
            }
            return;
        });




    });
});





