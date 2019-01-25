var animalPopulation = 0;

var allAnimals = [];

$(document).ready(function() {
    var tigger = new Tiger("Tigger");
    allAnimals.push(tigger);
    var pooh = new Bear("Pooh");
    allAnimals.push(pooh);
    var rarity = new Unicorn("Rarity");
    allAnimals.push(rarity);
    var gemma = new Giraffe("Gemma");
    allAnimals.push(gemma);
    var stinger = new Bee("Stinger");
    allAnimals.push(stinger);
    $("#animalBtn").click(function(){
        createAnimal();
    });
    $("#animalLister").click(function(){
        listAnimals();
    });
    listAnimals();
    $("#feedAnimals").click(function(){
        $("#animalsCreated").empty();
        var foodChoice = $("#foodChoices option:selected").text();
        for (var i = 0; i < allAnimals.length; i++){
            $("#animalsCreated").append(allAnimals[i].eat(foodChoice));
        }
    });
});

function createAnimal(){
    var animalChoice = $("#chooseAnimal").val();
    var animalName = $("#nameAnimal").val();
    var newAnimal;
    switch(parseInt(animalChoice)){
        case 1:
            newAnimal = new Tiger(animalName);
            break;
        case 2:
            newAnimal = new Bear(animalName);
            break;
        case 3:
            newAnimal = new Unicorn(animalName);
            break;
        case 4:
            newAnimal = new Giraffe(animalName);
            break;
        case 5:
            newAnimal = new Bee(animalName);
            break;

    }
    allAnimals.push(newAnimal);
    listAnimals();
}


function listAnimals(){
    $("#animalsCreated").empty();
    for(var i=0; i < allAnimals.length; i++){
        $("#animalsCreated").append( "New animal named " + allAnimals[i].name +
            ", who is a " + allAnimals[i].constructor.name + " who's favorite food is " +
            allAnimals[i].favoriteFood + " <a href='#' onclick='deleteAnimal(this)'>delete " + allAnimals[i].name + "</a><br>" );
    }
}

function deleteAnimal(animal){
    var longName = animal.innerHTML;
    var name = longName.substring(longName.indexOf(" ") + 1, longName.length);
    for(var i = 0; i < allAnimals.length; i++){
        if(name == allAnimals[i].name){
            allAnimals.splice(i,1);
        }
    }
    listAnimals();
}


class Animal {
    constructor(name,favoriteFood) {
        this.name = name;
        this.favoriteFood = favoriteFood;
        animalPopulation ++;
    }

    sleep() {
        $("#animalsCreated").append(" " + this.name + " sleeps for 8 hours." + "<br>");

    }

    eat(food) {
        $("#animalsCreated").append(this.name + " eats " + food + "<br>");
        this.favoriteFood == food ? $("#animalsCreated").append(" YUM!!! " + this.name + " wants more " + this.favoriteFood + "<br>")
            : this.sleep(" " + this.name + "<br>");
    }

    static getPopulation() {
        return animalPopulation;
    }

}

class Tiger extends Animal {
    constructor(name) {
        super(name, "meat");
    }
}

class Bear extends Animal{
    constructor(name) {
        super(name, "fish");
    }

    sleep() {
        $("#animalsCreated").append(" " + this.name + " hibernates for 4 months" + "<br>");
    }
}

class Unicorn extends Animal{
    constructor(name) {
        super(name, "marshmallows");
    }

    sleep() {
        $("#animalsCreated").append(" " + this.name + " sleeps in a cloud" + "<br>");
    }
}

class Giraffe extends Animal {
    constructor(name) {
        super(name, "leaves");
    }

    eat(food){
        if(this.favoriteFood == food) {
            super.eat("leaves");
            this.sleep();
        }else {
            $("#animalsCreated").append(" YUCK!!! " + this.name + " will not eat " + food + "<br>");
        }
    }
}

class Bee extends Animal {
    constructor(name){
        super(name, "pollen");
    }

    sleep() {
        $("#animalsCreated").append(" " + this.name + " never sleeps" + "<br>");
    }

    eat(food){
        if(this.favoriteFood == food) {
            super.eat("pollen");
            this.sleep();
        }else {
            $("#animalsCreated").append(" YUCK!!! " + this.name + " will not eat " + food + "<br>");
        }
    }
}

class Zookeeper {
    constructor(name){
        this.name = name;
    }

    feedAnimal(animals, food){
        $("#animalsCreated").append(" " + this.name + " is feeding " + food + " to " + animals.length + " of " + Animal.getPopulation() + " total animals.");
        for(var i = 0; i < animals.length; i++){
            animals[i].eat(food);
        }
    }
}
