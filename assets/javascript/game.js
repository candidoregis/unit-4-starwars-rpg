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

        $("#consoleStatus").text("Battle Started" );
        
        $("#attackBtn").on("click", function () {
            $("#consoleStatus").empty();
            if ((defender.isAlive()) && (hero.isAlive())) {
                $("#consoleStatus").append("<h3>Hero attacked Defender</h3>" );
                defender.receiveAttack(hero.attack());
                $("#consoleStatus").append("<h3> Defender received "+(hero.ap*(hero.powerImprove-1))+" of damage.</h3>" );

                if (defender.isAlive) {
                    $("#consoleStatus").append("Defender counter attacked Hero" );
                    hero.receiveAttack(defender.counterAttack());
                    $("#consoleStatus").append("<h3> Hero received "+defender.cp+" of damage.</h3>" );
                }
            }
            linkCharacters();
            if (!defender.isAlive()) {
                $("#consoleStatus").empty();
                $("#consoleStatus").append("<h3>Defender defeated.</h3>" );
                $("#consoleStatus").append("<h2>You WIN.</h2>");
                $("#player" + defenderSelected.value).remove();
            }
            if (!hero.isAlive()) {
                $("#consoleStatus").empty();
                $("#consoleStatus").append("<h3>Hero defeated.</h3>" );
                $("#consoleStatus").append("<h2>You LOSE.</h2>");
                $("#player" + heroSelected.value).remove();
            }
            
            //return;
        });




    });
});





