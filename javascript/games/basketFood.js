let gameControlsChosen = false;
let controls;
let controlsPosX, controlsW;
let keyboardImg, handsImg;
//* ML5 handpose webcam variables */
let ml5Setup = true;
let video;
let handPose;
let hands = [];

// let handpose;
// let video;
let predictions = [];
let dims = {};
let averageX = 0;
let newAverageX;
let handSkeletonColor = "#FFFF00"

/** game variables */
let font;
let gameStarted = false, gamePaused = false, gameOver = false;
let gameSpeed = 1;
let bg_basketFood;
let heart, heartW, lives = 3;
let points = 0;
let sentence = "Clica para começar.", fadeTxtStart = 255, fadeTxtStartSwitch = false;

/** end cutscene */
let gameEndedFrame, endCutsceneFadeIn = 0, endCutsceneSlides = false, endCutsceneSlide = 0, endCutsceneOver = false;
let basketFood_gameover, alphaGameOver = 0;

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
    handPose = ml5.handPose({ flipped: true }); //this would be in preload if only the option to control by hand camera movement existed, and the rest in setup

    font = loadFont('.././fonts/Jersey_10/Jersey10-Regular.ttf');

    keyboardImg = loadImage('../images/website/iconography/keyboard.png');
    handsImg = loadImage('../images/website/iconography/hand.png');
    

    heart = loadImage('../images/games/elements/heart.png');
    bg_basketFood = loadImage('../images/games/scenery/bg_basketFood_blurred.png');
    basketFood_gameover = loadImage('../images/games/gameover/basketFood_gameover.png');

    basket = loadImage('../images/games/elements/basket.png');
    banana = loadImage('../images/games/elements/banana.png');
    bread = loadImage('../images/games/elements/bread.png');
    fish = loadImage('../images/games/elements/fish.png');
    milk = loadImage('../images/games/elements/milk.png');
    potato = loadImage('../images/games/elements/potato.png');
};

export function basketFood_setup() {
    controlsPosX = width*0.3;
    controlsW = height/3;

    //* normal setup */
    rectMode(CENTER);

    heartW = width*0.05;

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
    image(bg_basketFood,
        width/2, height/2,
        width, height);

    if (!gameControlsChosen) {
        gameControls();
    } else {
        //* ML5 */
        if (controls == "hands") {
            if (ml5Setup) {
                video = createCapture(VIDEO, { flipped : true });
                video.size(width*1.1, height*1.1)
                video.hide();

                //starts detecting hands
                handPose.detectStart(video, gotHands);

                ml5Setup = false;
            }

            drawHands();
        }

        if (lives <= 0) {
            //* GAME OVER */
            gameStarted = false;
            gameOver = true;
            sentence = "Clica para recomeçar."
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

            /** saves the last frame before player lost */
            gameEndedFrame = frameCount
        }

        else {
            if (gameOver) {
                endCutsceneSlides = true;
                if (frameCount - gameEndedFrame > 50) {

                    image(basketFood_gameover, /* img */
                        width/2, height/2, /* x, y */
                        width, height) /* w, h */  

                    if (endCutsceneSlide == 0) {
                        endCutsceneSlideSentences("Antes da Revolução dos Cravos, muitos trabalhadores recebiam salários muito baixos.");
                    } else if (endCutsceneSlide == 1) {
                        endCutsceneSlideSentences("Mal conseguindo alimentar as suas famílias.");
                    } else if (endCutsceneSlide == 2) {
                        let sentenceEndCutscene;

                        if (points < 50) {
                            sentenceEndCutscene = "pouquíssimos dias"
                        } else if (points >= 50 && points < 100) {
                            sentenceEndCutscene = "alguns dias"
                        } else {
                            sentenceEndCutscene = "semanas"
                        }

                        endCutsceneSlideSentences("Com a quantidade de comida que apanhaste, conseguirias alimentar uma família de 4 por "+sentenceEndCutscene+"!");
                    } else if (endCutsceneSlide == 3) {
                        if (frameCount % 5 == 0) {
                            alphaGameOver += 20;
                        }

                        fill("#000000");
                        rect(width/2, height/2, width, height);

                        txtDisplay("Pontos feitos: "+points, width/2, height*0.45, 25, false);
                        textFont(font, 100);
                        fill(192, 57, 43, alphaGameOver);
                        stroke(0, 0, 0, alphaGameOver);
                        strokeWeight(3);
                        textAlign(CENTER, CENTER)
                        text("GAME OVER", width/2, height/2);
                        txtDisplay("Clique para tentar novamente.", width/2, height*0.6, 20, true);
                    } else {
                        endCutsceneSlides = false;
                        gameOver = false;

                        image(bg_basketFood,
                            width/2, height/2,
                            width, height);

                        image(basket, /* img */
                            basketPos.x, basketPos.y, /* x, y */
                            basketPos.w, basketPos.h) /* w, h */
                
                        txtDisplay(sentence, width*0.5, height*0.5, 32, true);
                    }
                } else {
                    endCutsceneFadeIn += (255/50);

                    push();
                    tint(255, endCutsceneFadeIn);
                    image(basketFood_gameover, /* img */
                        width/2, height/2, /* x, y */
                        width, height) /* w, h */  
                    pop();  
                }
            } else {
                image(bg_basketFood,
                    width/2, height/2,
                    width, height);

                image(basket, /* img */
                    basketPos.x, basketPos.y, /* x, y */
                    basketPos.w, basketPos.h) /* w, h */
        
                txtDisplay(sentence, width*0.5, height*0.5, 32, true);
            }
        }

        /** draws the hearts corresponding to how many lives the player still has available */
        if (!gameOver) {
            livesDisplay();
        }

        //* PAUSES GAME */
        if (!gameOver) {
            pauseGame();
        }
    }
}

/**
 * makes the basket move left and right, depending on the arrow that the player is pressing down
 */
function basketMovement() {
    if (goingRight
        && (basketPos.x + basketPos.w/2 <= width)) {
            
        basketPos.x += basketSpeed * gameSpeed;
        console.log(basketPos.x);
    } else if (goingLeft
        && (basketPos.x - basketPos.w/2 >= 0)) {
        basketPos.x -= basketSpeed * gameSpeed;
        console.log(basketPos.x);
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

    textFont(font, size);
    fill(255, 255, 255, fadeTxtStart)
    stroke(0, 0, 0, fadeTxtStart);
    strokeWeight(3);
    textAlign(CENTER, CENTER)
    text(sentence, posX, posY);
}

function livesDisplay() {
    if (lives == 3) {
        image(heart,
            width-heartW*3 - heartW*0.2, heartW,
            heartW, (heart.height*heartW)/heart.width)
    }
    
    if (lives <= 3 && lives > 1) {
        image(heart,
            width-heartW*2 - heartW*0.1, heartW,
            heartW, (heart.height*heartW)/heart.width)
    }
    
    if (lives >= 1) {
        image(heart,
            width-heartW, heartW,
            heartW, (heart.height*heartW)/heart.width)
    }
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

function pauseGame() {
    if (gamePaused) {
        txtDisplay("Jogo em pausa", width/2, height/2, 32, false);
        noLoop();
    }
}

export function basketFood_keyPressed() {
    //* PAUSES THE GAME */
    if (keyCode === 27) {
        gamePaused = !gamePaused;
        
        if (!gamePaused) {
            loop();
        }
    }

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
    //* mouse clicked on "teclado"(keyboard) control option */
    if (!gameControlsChosen &&
        (mouseX > controlsPosX-controlsW/2 && mouseX < controlsPosX+controlsW/2) &&
        (mouseY > (height/2-controlsW/2) && mouseY < (height/2+controlsW/2))) {
        controls = "keyboard";
        gameControlsChosen = true;
    }

    //* mouse clicked on "mãos"(hands) control option */
    else if (!gameControlsChosen &&
        (mouseX > (width-controlsPosX)-controlsW/2 && mouseX < (width-controlsPosX)+controlsW/2) &&
        (mouseY > (height/2-controlsW/2) && mouseY < (height/2+controlsW/2))) {
        controls = "hands";
        gameControlsChosen = true;
    }
    
    else if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && !gameStarted && !endCutsceneSlides
        && gameControlsChosen) {

        foodSpawn = {
            isCounting: false,
            timerStart: 0,
            timerShouldEnd: 200,
            timerEnded: false,
        };

        firstFoodAdded = false;
        foods = [];
        gameSpeed = 1;
        lives = 3;

        endCutsceneOver = false;
        endCutsceneFadeIn = 0;
        endCutsceneSlides = false;
        endCutsceneSlide = 0;
        alphaGameOver = 0;
        points = 0;
        
        gameStarted = true;
    }

    if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && endCutsceneSlides) {
        
        endCutsceneSlide++;
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

function endCutsceneSlideSentences(sentence) {
    let rectH = height*0.3;
    let rectY = height*0.7+rectH/2;
    let c = color(0, 0, 0);
    push();
    c.setAlpha(170);
    fill(c);
    rect(width/2, rectY, width, rectH);
    pop();

    txtDisplay(sentence, width/2, rectY-rectH*0.1, 25, false);
    txtDisplay("Clique para continuar", width/2, rectY+rectH*0.15, 20, true);
}

//* TO CHOOSE GAME CONTROLS */
function gameControls() {
    textFont(font, 20);
    textAlign(CENTER, CENTER);

    fill(253, 235, 208);
    strokeWeight(4);
    stroke("#C0392B");

    square(controlsPosX, height/2, controlsW);
    square(width-controlsPosX, height/2, controlsW);

    noStroke();
    fill("#000")
    text("Teclado", controlsPosX, height/2+controlsW*0.4);
    image(keyboardImg,
        controlsPosX, height/2,
        controlsW*0.6, ((controlsW*0.6)*keyboardImg.height)/keyboardImg.width);
    text("Controlo com mãos", width-controlsPosX, height/2+controlsW*0.4);
    image(handsImg,
        width-controlsPosX, height/2,
        controlsW*0.3, ((controlsW*0.3)*handsImg.height)/handsImg.width);
}

function gotHands(results) {
    hands = results;
}

function drawHands() {
    if (hands.length > 0) {
        let hand = hands[0];

        if (hand.confidence > 0.1) {
            let averageX = 0;
            // Loop through keypoints and draw circles
            for (let i = 0; i < hand.keypoints.length; i++) {
                let keypoint = hand.keypoints[i];
                averageX += keypoint.x;

                if (i == hand.keypoints.length-1) {
                    averageX = averageX / hand.keypoints.length;
                }

                basketPos.x = averageX;
                // basketPos.x = hand.wrist.x;
            }
        }
    }
}