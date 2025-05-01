/** game variables */
let gameStarted = false;
let gameSpeed = 1;
let lives = 3;

/** IMAGES */
let basket, banana, bread, fish, milk, potato;
let bananaW, bananaH, breadW, breadH, fishW, fishH, milkW, milkH, potatoW, potatoH;
let typeOfFood = [];

/** BASKET */
let basketX, basketY, basketW, basketH, basketPos;
let goingRight = false, goingLeft = false;
let basketSpeed = 7;

let foods = [];

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
    }

    if (gameStarted) {
        gameSpeed += 0.0001;

        /** ADDS THE FIRST FOOD */
        if (foods.length == 0) {   
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

        /** BASKET MOVEMENT */
        basketMovement();
    }

    else {
        image(basket, /* img */
            basketPos.x, basketPos.y, /* x, y */
            basketPos.w, basketPos.h) /* w, h */  
    }

}

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
    
    // if (mouseX > 0 && mouseX < width 
    //     && mouseY > 0 && mouseY < height
    //     && restart) {

    //     restart = false;
    //     cutscene = true;
    //     gameStarted = false;
    //     endInitialCutscene = false;

    //     failingImages = 0;
    //     failEachAnimation = false;

    //     points = 0;
    //     gameOver = false;

    //     charX = width*0.2;
    //     pideX = -(pide_running_R.width * charH)/pide_running_R.height;
    //     charCutsceneX = charX + (width/3);
    //     obstacles = [];
    // }
}

class Food {
    constructor(gameSpeed, foodW, foodH, imageFood, isBad) {
        this.speed = gameSpeed;
        this.foodW = foodW;
        this.foodH = foodH;
        this.imageFood = imageFood;
        this.isBad = isBad

        this.foodX = Math.floor(Math.random() * (width*0.95));
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