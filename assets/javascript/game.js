//

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
        this.powerImprove++;
        return parseInt(totAtack);
    };

    counterAttack() {
        return this.cp;
    };

    receiveAttack(atck) {
        this.hp = this.hp - atck;
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
var rounds = characteres.length - 1;

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

function logBattle(char, currentHero, currentDefender) {
    if (char === "defender"){
        console.log("HERO: HP=" + currentHero.hp + " AP=" + (currentHero.ap * currentHero.powerImprove));
    }
    if (char === "hero"){
        console.log("DEFENDER: HP=" + currentDefender.hp + " CP=" + currentDefender.cp);
    }
}

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
        console.log("New Defender");

        $("#consoleStatus").text("Battle Started");

        $("#attackBtn").on("click", function () {
            //linkCharacters();
            console.log("RODADA " + hero.powerImprove);
            if (defender.isAlive() && hero.isAlive()) {
                console.log("Hero attacked");
                logBattle("hero",hero, defender);
                //linkCharacters();
                $("#consoleStatus").empty();
                defender.receiveAttack(hero.attack());
                $("#consoleStatus").append("<h3>You attacked " + defender.name + " for " + (hero.ap * (hero.powerImprove - 1)) + " damage.</h3>");
                if (defender.isAlive()) {
                    console.log("Defender attacked");
                    hero.receiveAttack(defender.counterAttack());
                    $("#consoleStatus").append("<h3>" + defender.name + " attacked you back for " + defender.cp + " damage.</h3>");
                    logBattle("defender",hero, defender);
                }
                linkCharacters();
                if (!defender.isAlive()) {
                    rounds--;
                    $("#consoleStatus").empty();
                    $("#consoleStatus").append("<h3>Defender defeated.</h3>");
                    $("#player" + defenderSelected.value).remove(); 
                }
                if (!hero.isAlive()) {
                    $("#consoleStatus").empty();
                    $("#consoleStatus").append("<h3>Hero defeated.</h3>");
                    $("#player" + heroSelected.value).remove();
                }

                if (hero.isAlive()&&(rounds==0)) {
                    console.log("YOU WON THE WAR");
                } else if (!hero.isAlive()) {
                    if(rounds==0){
                        console.log("IT'S A DRAW, BUT YOU LOST THE WAR");
                    } else {
                        console.log("YOU LOST THE WAR");
                    }
                }
            }
        });




    });
});





