/** game variables */
let gameStarted = false;
let gameSpeed = 1;
let lives = 3;
let points = 0;
let sentence = "Clica para começar.", fadeTxtStart = 255, fadeTxtStartSwitch = false;

/** FOOD */
let banana, bread, fish, milk, potato;
let bananaW, bananaH, breadW, breadH, fishW, fishH, milkW, milkH, potatoW, potatoH;
let firstFoodAdded = false;
let typeOfFood = [];
let foods = [];
let numberOfFood = 0;
let foodSpawn = {
        isCounting: false,
        timerStart: 0,
        timerShouldEnd: 200,
        timerEnded: false,
    };

/** BASKET */
let basket;
let basketX, basketY, basketW, basketH, basketPos;
let goingRight = false, goingLeft = false;
let basketSpeed = 9;


export function basketFood_preload() {
    basket = loadImage('../images/games/elements/basket.png');
    banana = loadImage('../images/games/elements/banana.png');
    bread = loadImage('../images/games/elements/bread.png');
    fish = loadImage('../images/games/elements/fish.png');
    milk = loadImage('../images/games/elements/milk.png');
    potato = loadImage('../images/games/elements/potato.png');
};

export function basketFood_setup() {
    basketW = width*0.1;
    basketH = (basket.height*basketW)/basket.width;
    basketX = width/2;
    basketY = height*0.8;
    basketPos = {
        x: basketX,
        y: basketY,
        w: basketW,
        h: basketH,
    }

    //********************************* FOOD */
    bananaW = basketW*0.3;
    bananaH = (banana.height*bananaW)/banana.width;

    breadW = basketW*0.3;
    breadH = (bread.height*breadW)/bread.width;

    fishW = basketW*0.3;
    fishH = (fish.height*fishW)/fish.width;

    milkW = basketW*0.3;
    milkH = (milk.height*milkW)/milk.width;

    potatoW = basketW*0.3;
    potatoH = (potato.height*potatoW)/potato.width;
    
    typeOfFood = [
        {
            image: banana,
            foodW: bananaW,
            foodH: bananaH,
            isBad: false,
        },
        {
            image: bread,
            foodW: breadW,
            foodH: breadH,
            isBad: false,
        },
        {
            image: fish,
            foodW: fishW,
            foodH: fishH,
            isBad: false,
        },
        {
            image: milk,
            foodW: milkW,
            foodH: milkH,
            isBad: false,
        },
        {
            image: potato,
            foodW: potatoW,
            foodH: potatoH,
            isBad: false,
        },
    ]
}

export function basketFood_draw() {
    noStroke();
    background('#aaffff');

    if (lives <= 0) {
        //* GAME OVER */
        gameStarted = false;
        sentence = "Clica para recomeçar."

        firstFoodAdded = false;
        gameSpeed = 1;
        lives = 3;
        points = 0;
        basketPos.x = width/2;
    }

    if (gameStarted) {
        gameSpeed += 0.0001;

        /** ADDS THE FIRST FOOD */
        if (!firstFoodAdded) {   
            firstFoodAdded = true;
            let whichFood = Math.floor(Math.random() * typeOfFood.length);

            foods.push(new Food(gameSpeed, typeOfFood[whichFood].foodW, typeOfFood[whichFood].foodH, typeOfFood[whichFood].image, typeOfFood[whichFood].isBad)); //gameSpeed, foodW, foodH, imageFood, isBad
        }

        /** MAKES THE FOOD APPEAR ON SCREEN */
        for (let i = foods.length - 1; i >= 0; i--) {
            foods[i].update();
            foods[i].display(basketPos);
            
            /** if food collides with basket */
            if (foods[i].collides(basketPos)) {
                foods.splice(i, 1); //deletes the food
            };
    
            /** if floor is offscreen, delete it */
            if (foods.length != 0 && foods[i].offscreen()) {
                lives -= 1;
                foods.splice(i, 1); //deletes the food that got off bounds
            }
        }
        
        /* starts the timer responsible for adding a new food on screen */
        foodSpawn = timer(foodSpawn.isCounting, foodSpawn.timerStart, foodSpawn.timerShouldEnd);
        if (foodSpawn.timerEnded) { //if the timer ended
            foodSpawn.timerEnded = false;

            if (foodSpawn.timerShouldEnd >= 125) { //doesn't let the food spawn any faster than every X frames                
                foodSpawn.timerShouldEnd -= 5 * gameSpeed; //reduces the amount of timer needed to spawn the next food
            } else if (foodSpawn.timerShouldEnd >= 100) {
                foodSpawn.timerShouldEnd -= 2 * gameSpeed;
                basketSpeed += 0.05;
            } else if (foodSpawn.timerShouldEnd >= 50) {
                foodSpawn.timerShouldEnd -= 1 * gameSpeed;
                basketSpeed += 0.1;
            } else {
                foodSpawn.timerShouldEnd -= 0.1 * gameSpeed;
            }

            /* adds new food on screen */
            let whichFood = Math.floor(Math.random() * typeOfFood.length);
            foods.push(new Food(gameSpeed, typeOfFood[whichFood].foodW, typeOfFood[whichFood].foodH, typeOfFood[whichFood].image, typeOfFood[whichFood].isBad)); //gameSpeed, foodW, foodH, imageFood, isBad
        }
        

        /** BASKET MOVEMENT */
        basketMovement();
        txtDisplay(points, width*0.5, height*0.05, 40, false);
    }

    else {
        image(basket, /* img */
            basketPos.x, basketPos.y, /* x, y */
            basketPos.w, basketPos.h) /* w, h */

        txtDisplay(sentence, width*0.5, height*0.5, 32, true);
    }

}

/**
 * makes the basket move left and right, depending on the arrow that the player is pressing down
 */
function basketMovement() {
    if (goingRight
        && (basketPos.x + basketPos.w/2 <= width)) {
        basketPos.x += basketSpeed * gameSpeed;
    } else if (goingLeft
        && (basketPos.x - basketPos.w/2 >= 0)) {
        basketPos.x -= basketSpeed * gameSpeed;
    }

    image(basket, /* img */
        basketPos.x, basketPos.y, /* x, y */
        basketPos.w, basketPos.h) /* w, h */
}

/**
 * diplays sentence on screen
 * @param {string} sentence the sentence that is displayed on screen
 * @param {int} posX it's position in X
 * @param {int} posY it's position in Y
 * @param {int} size the text size
 * @param {boolean} isFade either TRUE or FALSE. If "TRUE" it has a constant fading animtion
 */
function txtDisplay(sentence, posX, posY, size, isFade) {
    /** TEXTO */
    if (isFade) {
        if (frameCount % 100 == 0) {
            fadeTxtStartSwitch = !fadeTxtStartSwitch;
        }
    
        if (fadeTxtStartSwitch) {
            fadeTxtStart += 1.5;
        } else {
            fadeTxtStart -= 1.5;
        }
    } else {
        fadeTxtStart = 255;
    }

    textSize(size);
    fill(255, 255, 255, fadeTxtStart)
    stroke(0, 0, 0, fadeTxtStart);
    strokeWeight(3);
    textAlign(CENTER, CENTER)
    text(sentence, posX, posY);
}

/**
 * waits the amount of frames wanted before returning TRUE
 * @param {boolean} isCounting keeps track of the fact: if timer has start or not
 * @param {int} timerStart when the timer started counting
 * @param {boolean} timerShouldEnd how long the wait must be for
 * @returns 
 */
function timer(isCounting, timerStart, timerShouldEnd) {
    if (!isCounting) {
        isCounting = true;
        timerStart = frameCount;
        let timerEnded = false;
        
        return {isCounting, timerStart, timerShouldEnd, timerEnded};
    }

    else {
        let timerNow = frameCount;
        

        if (timerNow - timerStart >= timerShouldEnd) {
            isCounting = false;
            let timerEnded = true;
            
            return {isCounting, timerStart, timerShouldEnd, timerEnded};
        }

        else {
            let timerEnded = false;
            return {isCounting, timerStart, timerShouldEnd, timerEnded};
        }
    }
}

export function basketFood_keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        goingRight = true;
    }

    if (keyCode === LEFT_ARROW) {
        goingLeft = true;
    }

    /* if the player is holding both arrows down, then it will prioritaze the last one */
    if (keyCode === LEFT_ARROW && goingRight == true) {
        goingRight = false;
        goingLeft = true;
    }

    if (keyCode === RIGHT_ARROW && goingLeft == true) {
        goingLeft = false;
        goingRight = true;
    }
}

export function basketFood_keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        goingRight = false;
    }

    if (keyCode === LEFT_ARROW) {
        goingLeft = false;
    }
}

export function basketFood_mouseClicked() {
    if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && !gameStarted) {

        gameStarted = true;
    }
}

class Food {
    constructor(gameSpeed, foodW, foodH, imageFood, isBad) {
        this.speed = gameSpeed;
        this.foodW = foodW;
        this.foodH = foodH;
        this.imageFood = imageFood;
        this.isBad = isBad

        this.foodX = Math.floor(Math.random() * (width*0.95));
        if (this.foodX+this.foodW/2 < width) {
            this.foodX += this.foodW/2;
        } else {
            this.foodX -= this.foodW/2;
        }

        this.foodY = 0 - foodH/2;
    }
    
    update() {
        this.foodY += 5 * this.speed;
        /** "plus" to make the object fall from the top of canvas to the very bottom
         * "5" is the default speed
         * "speed" is used to make it fall faster each frame as the original "gameSpeed" variable increases
         */
    }
    
    display(element) { /** makes the food appear on the canvas */
        image(this.imageFood, /* img */
            this.foodX, this.foodY, /* x, y */
            this.foodW, this.foodH) /* w, h */

        /* FOOD AND BASKET DEBUG HELP */
        // fill("#FF0000")
        // rect(this.foodX + this.foodW/2, this.foodY, 10, 10)
        // rect(element.x- element.w/2, element.y-5, 20, 20)

    }
    
    offscreen() {
        /** if food left the screen (by passing the bottom limit) */
        return (this.foodY > (height+this.foodH/2));
    }
  
    collides(element) {
        if (!this.isBad /** food is "good" food */
            && this.foodX - this.foodW/2 < element.x + element.w/2 /** if farthest point on the left of the food is "more to the left" than the farthest point to the right of the basket */
            && this.foodX + this.foodW/2 > element.x - element.w/2 /** if farthest point on the right of the food is "more to the right" than the farthest point to the left of the basket */
            && this.foodY - this.foodH/2 < element.y /** if the highest point of the food is ABOVE(<) the lowest point of the basket */
            && this.foodY + this.foodH/2 > element.y) { /** if the lowest point of the food is BELOW(>) the highest point of the basket */
            
            points += 5;

            return true;
        } else if (!this.isBad /** food is "good" food */
            && this.foodX - this.foodW/2 < element.x + element.w/2/** if farthest point on the left of the food is "more to the left" than the farthest point to the right of the basket */
            && this.foodX + this.foodW/2 > element.x - element.w/2 /** if farthest point on the right of the food is "more to the right" than the farthest point to the left of the basket */
            && this.foodY - this.foodH/2 < element.y /** if the highest point of the food is ABOVE(<) the lowest point of the basket */
            && this.foodY + this.foodH/2 > element.y) { /** if the lowest point of the food is BELOW(>) the highest point of the basket */

            lives -= 1;

            return true;
        } else {
            return false;
        }
    }
}