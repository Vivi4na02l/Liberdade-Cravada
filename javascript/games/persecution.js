/** game rules and scenery variables */
let font;
let sentence = "Clique para começar", gameOver = false, restart = false, gamePaused = false;
let points = 0;
let gameSpeed = 1;
let scenery = "subway", newScenery = "default";
let fade = 0, fadeIn = true;
let backgroundW, backgroundH, backgroundX, backgroundY;
let gameOverStart;

/** cutscene */
let fadeTxtStartSwitch = false, fadeTxtStart = 255, gameStarted = false;
let cutscene = true, switchIdle = true;
let npc1, npc1_idle_1, npc1_idle_2, npc2, npc2_idle_back_1, npc2_idle_back_2, npc3, npc3_idle_back_1, npc3_idle_back_2;
let npcsFade = 255, npcsFadePerFrame;
let charIdle, char_idle_1, char_idle_2;
let pide_running_L, pide_running_M, pide_running_R, pide_idle_1, pide_idle_2;
let pideIdle, pideRun, pideX, charCutsceneX;
let dog_running_1, dog_running_2, seagull_1, seagull_2, animalSwitch = false;
let cutsceneStart, cutsceneEnd, cutsceneDuration = 100, endInitialCutscene = false;

let persecution_gameover;
let endingCutsceneTimer = {
    isCounting: false,
    timerStart: 0,
    timerShouldEnd: 50,
    timerEnded: false,
};
let endingCutsceneVars = {alpha: 0, gameoverImage: false, slideStarts: false, slide: 0, alphaGameOver: 0};

let floor_subway, floor_subway_bg, bg_subway;
let floors = [];

/** character variables */
let charX, charY, charW, charH, charYDefault, charYBackToDefault;
let charSlidingW, charSlidingH, charSlidingY;
let char_running_R, char_running_M, char_running_L;
let charRun;
let char_sliding_1, char_sliding_2, char_sliding_3;
let char_jumping_1, char_jumping_2, char_jumping_3, char_jumping_4, char_jumping_5;
let char_tripping_forward_1, char_tripping_forward_2, char_tripping_forward_3;
let char_tripping_backwards_1, char_tripping_backwards_2, char_tripping_backwards_3;

let char_position = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
}

/** floor variables */
let floorX, floorY, floorW, floorH, floorYPlacement;

/** obstacles variables */
let obsX, obsY, obsW, obsH; /* short obstacle on the floor */
let tallObsX, tallObsY, tallObsW, tallObsH; /* obstacle too tall (player needs to roll) */
let obstacles = [];
let typeOfObstacle = 1, typeOfObstacleHit;
let firstObstacleAdded = false;
let obstacleSpawn = {
    isCounting: false,
    timerStart: 0,
    timerShouldEnd: 200,
    timerEnded: false,
};

let fail = false
let obstacleHit, hitWhenSwitch, hitObstacleStart, hitObstacleEnd, hitObstacleSwitch;
let failingImages = 0, failEachAnimation = false, anglePerFrame, totalAngle = 0, translateXPerFrame, translateYPerFrame;
let char_fail //* ARRAY WITH IMAGES OF THE CHARACTER FALLING */

/** movement keyboard variables */
let jump = false;
let jumpWhenSwitch = 10, jumpWhenSwitchStart, jumpWhenSwitchEnd, jumpingImages = 0, jumpEachAnimation = false;

let slide = false
let slideWhenSwitch = 20, slideWhenSwitchStart, slideWhenSwitchEnd, slidingImages = 0, slideEachAnimation = false;

let runSwitch = true, runWhenSwitch = 20, runWhenSwitchStart, runWhenSwitchEnd, runningImages = 0;

export function persecution_preload() {
    font = loadFont('.././fonts/Jersey_10/Jersey10-Regular.ttf');
    
    dog_running_1 = loadImage('../images/games/elements/dog_running_1.png');
    dog_running_2 = loadImage('../images/games/elements/dog_running_2.png');
    seagull_1 = loadImage('../images/games/elements/seagull_1.png');
    seagull_2 = loadImage('../images/games/elements/seagull_2.png');

    /** ENTRY CUTSCENE */
    npc1_idle_1 = loadImage('../images/games/characters/npc1_idle_1.png');
    npc1_idle_2 = loadImage('../images/games/characters/npc1_idle_2.png');
    npc2_idle_back_1 = loadImage('../images/games/characters/npc2_idle_back_1.png');
    npc2_idle_back_2 = loadImage('../images/games/characters/npc2_idle_back_2.png');
    npc3_idle_back_1 = loadImage('../images/games/characters/npc3_idle_back_1.png');
    npc3_idle_back_2 = loadImage('../images/games/characters/npc3_idle_back_2.png');

    char_idle_1 = loadImage('../images/games/characters/char_idle_1.png');
    char_idle_2 = loadImage('../images/games/characters/char_idle_2.png');

    npc1 = [npc1_idle_1, npc1_idle_2, true];
    npc2 = [npc2_idle_back_1, npc2_idle_back_2, true];
    npc3 = [npc3_idle_back_1, npc3_idle_back_2, true];
    charIdle = [char_idle_1, char_idle_2, true];

    pide_running_R = loadImage('../images/games/characters/pide_running_R.png');
    pide_running_M = loadImage('../images/games/characters/pide_running_M.png');
    pide_running_L = loadImage('../images/games/characters/pide_running_L.png');
    pide_idle_1 = loadImage('../images/games/characters/pide_idle_1.png');
    pide_idle_2 = loadImage('../images/games/characters/pide_idle_2.png');
    pideRun = [pide_running_L, pide_running_M, pide_running_R];
    pideIdle = [pide_idle_1, pide_idle_2];

    /** CHARACTER DURING GAMEPLAY */
    char_running_R = loadImage('../images/games/characters/char_running_R.png');
    char_running_M = loadImage('../images/games/characters/char_running_M.png');
    char_running_L = loadImage('../images/games/characters/char_running_L.png');

    charRun = [char_running_L, char_running_M, char_running_R];

    char_sliding_1 = loadImage('../images/games/characters/char_sliding_1.png');
    char_sliding_2 = loadImage('../images/games/characters/char_sliding_2.png');
    char_sliding_3 = loadImage('../images/games/characters/char_sliding_3.png');
    
    char_jumping_1 = loadImage('../images/games/characters/char_jumping_1.png');
    char_jumping_2 = loadImage('../images/games/characters/char_jumping_2.png');
    char_jumping_3 = loadImage('../images/games/characters/char_jumping_3.png');
    char_jumping_4 = loadImage('../images/games/characters/char_jumping_4.png');

    char_tripping_forward_1 = loadImage('../images/games/characters/char_tripping_forward_1.png');
    char_tripping_forward_2 = loadImage('../images/games/characters/char_tripping_forward_2.png');
    char_tripping_forward_3 = loadImage('../images/games/characters/char_tripping_forward_3.png');
    char_tripping_backwards_1 = loadImage('../images/games/characters/char_tripping_backwards_1.png');
    char_tripping_backwards_2 = loadImage('../images/games/characters/char_tripping_backwards_2.png');
    char_tripping_backwards_3 = loadImage('../images/games/characters/char_tripping_backwards_3.png');

    /** ENDING CUTSCENE */
    persecution_gameover = loadImage('../images/games/gameover/persecution_gameover.png');
    
    /** SCENERY */
    floor_subway = loadImage('../images/games/scenery/floor_subway.png');
    floor_subway_bg = loadImage('../images/games/scenery/floor_subway_bg.png');
    // bg_front_subway = loadImage('../images/games/scenery/bg_front_subway.png');
    bg_subway = loadImage('../images/games/scenery/bg_subway_blurred.png');

    // floor_lisbon = loadImage('../images/games/scenery/floor_lisbon.png');
}

export function persecution_setup() {
    //* background */
    backgroundW = width*1.5;
    backgroundH = height*1.5;
    backgroundX = backgroundW/2;
    backgroundY = backgroundH/2;

    //* floor
    floorH = height*0.4;
    floorW = (floor_subway.width*floorH)/floor_subway.height /* makes width of image proportionate to its height. Assuming the img "floor_subway" dimensions are gonna be standard for other floor images */
    floorX = width-floorW/2;
    floorY = height - floorH/2;
    floorYPlacement = floorY - floorH/4;

    //* character
    charW = width*0.1;
    charH = width*0.15;
    charX = width*0.2;
    charY = floorYPlacement - charH/2;
    charYDefault = charY;

    charSlidingW = charW * 1.2;
    charSlidingH = charH * 0.55;
    charSlidingY = floorYPlacement - charSlidingH/2;

    //* pide
    pideX = -(pide_running_R.width * charH)/pide_running_R.height;
    charCutsceneX = charX + (width/3);

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorYPlacement - obsH/2;

    tallObsW = width*0.08;
    tallObsH = width*0.03;
    tallObsX = width*0.7;
    tallObsY = floorYPlacement - charH;

    // subwayH = height/1.7;
    // subwayW = (bg_front_subway.width*(subwayH))/bg_front_subway.height;
    // subwayX = width+subwayW/2;
    // subwayY = height-(subwayH)/2;

    //* GAME OVER
    char_fail = {
        "forward": [char_tripping_forward_1, char_tripping_forward_2, char_tripping_forward_3],
        "backwards": [char_tripping_backwards_1, char_tripping_backwards_2, char_tripping_backwards_3]
    }

    imageMode(CENTER);
    rectMode(CENTER);
}

export function persecution_draw() {
    noStroke();
    background('#aaffff');    

    //************ MOVEMENT and SCENERY */
    if (!cutscene && !gameOver) {
        gameSpeed += 0.0001;
        // backgroundX -= 0.25 * gameSpeed;
    }

    if (frameCount % 20 == 0) {
        animalSwitch = !animalSwitch 
    }

    /** BACKGROUND */
    image(bg_subway, /* img */
        backgroundX, backgroundY*0.8, /* x, y */
        backgroundW, backgroundH) /* w, h */
        
        
    //************ FLOOR */
    if (floors.length == 0) {   
        /* Runs the looping depending on how many floors are needed in the screen at the same time to cover its width completely */ /** Math.ceil -> 1.00001 = 2 */
        for (let i = 0; i < (Math.ceil(width / floorW)+1) ; i++) {
            if (floors.length == 0) {
                floors.push(new Floor((width-floorW/2 - floorW), scenery)); /** width-floorW/2 - floorW */ /* the scenery moves from right to left, so naturally the first image needs to be added on the extreme left, this bit of code makes it so the amount left empty on the left screen is filled with the first floor image */
            } else {
                floors.push(new Floor((floors[i-1].floorX + floorW), scenery));
            }
        }
    }
    
    for (let i = floors.length - 1; i >= 0; i--) {
        if (!cutscene && !gameOver) {
            floors[i].update();
        }
        floors[i].display();

        /** if floor is offscreen, delete it and add a new one */
        if (floors[i].offscreen()) {
            floors.splice(i, 1);
            floors.push(new Floor((floors[floors.length-1].floorX + floorW), scenery));
        }
    }


    //************ CHARACTER */
    if (!cutscene) {
        if (!gameOver) {
            /** when character is jumping */
            charJump();
            /** when character is sliding */
            charSlide();
            
            /** when character is just running (default) */
            if (!jump && !slide) {
                animationRun(charRun, true, charX);
            }
    
            gameOverStart = frameCount;
        //************ GAMEOVER */
        /** character falling/tripping down */
        } else {
            if (frameCount - gameOverStart <= 100) {
                cutsceneRun(width/3, 1, gameOverStart, true);
                animationRun(pideRun, false, pideX);
            } else {
                
                /** npc 1 */
                if (obstacleHit == 1) {
                    openingCutscene(pideIdle, pideX, charYDefault, 1, 45, 255); //charImage, posX, posY, facingDirection, frameCycle
                } else {
                    openingCutscene(pideIdle, pideX, charYDefault, -1, 45, 255); //charImage, posX, posY, facingDirection, frameCycle
                }
            }
            
            if (obstacleHit == 1) { /* obstacle to jump over (character trips if failed to jump) */
                charFails(1);
            } else { /* obstacle to roll under (character falls backwards if failed to roll) */
                charFails(-1);
            }

            if (frameCount - gameOverStart > 200) {
                endingCutscene();
            }
        }
    }

    //************ INITIAL CUTSCENE */
    if (cutscene) {
        if (!gameStarted) {
            /** character */
            openingCutscene(charIdle, charCutsceneX, charYDefault, 1, 40, 255); //charImage, posX, posY, facingDirection, frameCycle

            /** npc 1 */
            openingCutscene(npc1, charX+charW+width/3, charYDefault, -1, 45, 255); //charImage, posX, posY, facingDirection, frameCycle

            /** npc 2 */
            openingCutscene(npc2, charX+width/3, charYDefault + charH/2, 1, 42, 255); //charImage, posX, posY, facingDirection, frameCycle

            /** npc 3 */
            openingCutscene(npc3, charX + 3*(charW/4)+width/3, charYDefault + charH/2, -1, 47, 255); //charImage, posX, posY, facingDirection, frameCycle

            /** TEXTO */
            txtDisplay(sentence, width/2, height*0.7, 32, true);
        }

        else {
            if (!endInitialCutscene) {
                cutsceneRun(width/3, 1, cutsceneStart, true); /** responsible for the movement of the character/pide */ //finalX, directionMovement, cutsceneStart, isPide
                animationRun(pideRun, false, pideX); /** responsible for the run animation of the character/pide */

                /** character */
                openingCutscene(charIdle, charCutsceneX, charYDefault, -1, 40, 255); //charImage, posX, posY, facingDirection, frameCycle
            } else {
                //* pide */
                cutsceneRun(width/3, -1, cutsceneStart, true); /** responsible for the movement of the character/pide */
                animationRun(pideRun, false, pideX); /** responsible for the run animation of the character/pide */
                
                //* char */
                cutsceneRun(width/3, -1, cutsceneStart, false); /** responsible for the movement of the character/pide */
                animationRun(charRun, false, charCutsceneX); /** responsible for the run animation of the character/pide */
            }

            npcsFadePerFrame = 255/25;

            if (frameCount - cutsceneStart > 25) {
                npcsFade -= npcsFadePerFrame;
            }

            /** npc 1 */
            openingCutscene(npc1, charX+charW+width/3, charYDefault, -1, 45, npcsFade); //charImage, posX, posY, facingDirection, frameCycle

            /** npc 2 */
            openingCutscene(npc2, charX+width/3, charYDefault + charH/2, 1, 42, npcsFade); //charImage, posX, posY, facingDirection, frameCycle

            /** npc 3 */
            openingCutscene(npc3, charX + 3*(charW/4)+width/3, charYDefault + charH/2, -1, 47, npcsFade); //charImage, posX, posY, facingDirection, frameCycle
        }
    }
    

    //************ OBSTACLES */
    /** spawns the first obstacle */
    if (!cutscene) {
        if (!firstObstacleAdded) {
            firstObstacleAdded = true;
            typeOfObstacle = Math.ceil(Math.random() * 2) /** 1,2 */

            if (typeOfObstacle == 1) {
                obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH, typeOfObstacle));
            } else if (typeOfObstacle == 2) {
                obstacles.push(new Obstacle(gameSpeed, width, tallObsY, tallObsW, tallObsH, typeOfObstacle));
            }
        } else {
            if (!gameOver) {
                /* starts the timer responsible for adding a new obstacle on screen */
                obstacleSpawn = timer(obstacleSpawn.isCounting, obstacleSpawn.timerStart, obstacleSpawn.timerShouldEnd);
                if (obstacleSpawn.timerEnded) { //if the timer ended
                    obstacleSpawn.timerEnded = false;

                    if (obstacleSpawn.timerShouldEnd >= 125) { //doesn't let the food spawn any faster than every X frames                
                        obstacleSpawn.timerShouldEnd -= 5 * gameSpeed; //reduces the amount of timer needed to spawn the next food
                    } else if (obstacleSpawn.timerShouldEnd >= 100) {
                        obstacleSpawn.timerShouldEnd -= 2 * gameSpeed;
                        // basketSpeed += 0.05;
                    } else if (obstacleSpawn.timerShouldEnd >= 50) {
                        obstacleSpawn.timerShouldEnd -= 1 * gameSpeed;
                        // basketSpeed += 0.1;
                    } else {
                        obstacleSpawn.timerShouldEnd -= 0.1 * gameSpeed;
                    }

                    /* adds new obstacle on screen */
                    typeOfObstacle = Math.ceil(Math.random() * 2) /** 1,2 */
                            
                    if (typeOfObstacle == 1) {
                        obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH, typeOfObstacle));
                    } else if (typeOfObstacle == 2) {
                        obstacles.push(new Obstacle(gameSpeed, width, tallObsY, tallObsW, tallObsH, typeOfObstacle));
                    }
                }
            }
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].display(char_position);
        if (obstacles[i].collides(char_position)) {
            gameOver = true;
        };

        /** if obstacle is offscreen, delete it and add a new one */
        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
        }
    }

    //************ POINTS */
    if (!cutscene && !gameOver) {
        points++;
    }

    if (!cutscene && !gameOver) {
        textSize(32);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER)
        text(points, width/2, height*0.05);
    }

    //* PAUSES GAME */
    pauseGame();
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

function endingCutscene() {
    if (endingCutsceneVars.gameoverImage || endingCutsceneTimer.timerEnded) {
        endingCutsceneVars.gameoverImage = true;

        image(persecution_gameover,
            width/2, height/2,
            width, height)

        endingCutsceneTimer = timer(endingCutsceneTimer.isCounting, endingCutsceneTimer.timerStart, endingCutsceneTimer.timerShouldEnd);
        if (endingCutsceneTimer.timerEnded) {
            endingCutsceneVars.slideStarts = true;
        }

        if (endingCutsceneVars.slideStarts) {
            if (endingCutsceneVars.slide == 0) {
                let rectH = height*0.3
                let rectY = height*0.7+rectH/2
                let c = color(0, 0, 0);
                push();
                c.setAlpha(170);
                fill(c);
                rect(width/2, rectY, width, rectH);
                pop();

                txtDisplay("Na altura da ditadura, até uma simples conversa entre quatro amigos podia ser vista como perigosa.", width/2, rectY-rectH*0.1, 25, false);
                txtDisplay("Clique para continuar", width/2, rectY+rectH*0.15, 20, true);
            } else if (endingCutsceneVars.slide == 1) {
                let rectH = height*0.3
                let rectY = height*0.7+rectH/2
                let c = color(0, 0, 0);
                push();
                c.setAlpha(170);
                fill(c);
                rect(width/2, rectY, width, rectH);
                pop();

                txtDisplay("A polícia podia intervir e levar as pessoas presas, mesmo sem razão aparente.", width/2, rectY-rectH*0.1, 25, false);
                txtDisplay("Clique para continuar", width/2, rectY+rectH*0.15, 20, true);
            } else {
                if (frameCount % 5 == 0) {
                    endingCutsceneVars.alphaGameOver += 20;
                }

                txtDisplay("Pontos feitos: "+points, width/2, height*0.45, 25, false);
                textFont(font, 100);
                fill(192, 57, 43, endingCutsceneVars.alphaGameOver);
                stroke(0, 0, 0, endingCutsceneVars.alphaGameOver);
                strokeWeight(3);
                textAlign(CENTER, CENTER)
                text("GAME OVER", width/2, height/2);
                txtDisplay("Clique para tentar novamente.", width/2, height*0.6, 20, true);

                restart = true;
            }
        }
    } else {
        /** fades the image in */
        endingCutsceneVars.slide = 0;
        endingCutsceneTimer = timer(endingCutsceneTimer.isCounting, endingCutsceneTimer.timerStart, endingCutsceneTimer.timerShouldEnd);
        let alphaPerFrame = 255/endingCutsceneTimer.timerShouldEnd;
        
        endingCutsceneVars.alpha += alphaPerFrame;

        push();
        tint(255, endingCutsceneVars.alpha);
        image(persecution_gameover,
            width/2, height/2,
            width, height)
        pop();
    }

}

export function persecution_mouseClicked() {
    if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && cutscene && !gameStarted) {

        gameStarted = true;
        cutsceneStart = frameCount;
    }
    
    if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && endingCutsceneVars.slideStarts) {

        endingCutsceneVars.slide++
    }

    if (mouseX > 0 && mouseX < width 
        && mouseY > 0 && mouseY < height
        && restart) {

        restart = false;
        cutscene = true;
        gameStarted = false;
        endInitialCutscene = false;

        failingImages = 0;
        failEachAnimation = false;
        totalAngle = 0

        points = 0;
        gameOver = false;

        endingCutsceneTimer.timerEnded = false;
        endingCutsceneVars.gameoverImage = false;
        endingCutsceneVars.slideStarts = false;
        endingCutsceneVars.slide = -1;
        endingCutsceneVars.alpha = 0;
        endingCutsceneVars.alphaGameOver = 0;
        endingCutsceneTimer.isCounting = false;

        charX = width*0.2;
        pideX = -(pide_running_R.width * charH)/pide_running_R.height;
        charCutsceneX = charX + (width/3);
        obstacles = [];
    }
}

function pauseGame() {
    if (gamePaused) {
        txtDisplay("Jogo em pausa", width/2, height/2, 32, false);
        noLoop();
    }
}

export function persecution_keyPressed() {
    //* PAUSES THE GAME */
    if (keyCode === 27) {
        gamePaused = !gamePaused;
        
        if (!gamePaused) {
            loop();
        }
    }
}

export function persecution_keyReleased() {
    if (key === ' ') {
        jump = true;

        charJump();
    }

    if (keyCode === DOWN_ARROW) {
        slide = true;

        charSlide();
    }
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

        textFont(font, size);
        fill(255, 255, 255, fadeTxtStart)
        stroke(0, 0, 0, fadeTxtStart);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text(sentence, posX, posY);
    } else {
        textFont(font, size);
        fill(255, 255, 255, 255)
        stroke(0, 0, 0, fadeTxtStart);
        strokeWeight(3);
        textAlign(CENTER, CENTER)
        text(sentence, posX, posY);
    }

}

function openingCutscene(charImage, posX, posY, facingDirection, frameCycle, alpha) {
    if (frameCount % frameCycle == 0) {
        charImage[2] = !charImage[2];
    }

    if (charImage[2]) {
        push();
        translate(posX, posY)
        scale(facingDirection,1);
        tint(255, alpha);
        image(charImage[0], /* img */
            0, 0, /* x, y */
            (charImage[0].width * charH)/charImage[0].height, charH) /* w, h */
        pop();
    } else {
        push();
        translate(posX, posY)
        scale(facingDirection,1);
        tint(255, alpha);
        image(charImage[1], /* img */
            0, 0, /* x, y */
            (charImage[1].width * charH)/charImage[1].height, charH) /* w, h */
        pop();
    }
}

/**
 * responsible for the movement of the character/pide in the cutscenes
 * @param {*} finalX where you want the image to go to by the end of the timer
 * @param {*} directionMovement if it's moving to the right or left
 * @param {*} start the first value of frameCount registered for the timer
 * @param {*} isPide if the image is the image associated to PIDE
 */
function cutsceneRun(finalX, directionMovement, start, isPide) {
    let xPerFrame = finalX / cutsceneDuration;
    cutsceneEnd = frameCount;

    if (cutsceneEnd - start < cutsceneDuration) {
        if (isPide) {            
            pideX += xPerFrame * directionMovement;
        } else {
            charCutsceneX += xPerFrame * directionMovement;
        }
    } else {
        if (!endInitialCutscene) {
            cutsceneStart = frameCount;
        } else {
            cutscene = false;
        }

        endInitialCutscene = true;
    }
}

/**
 * function that makes the character jump
 */
function charJump() {
    /** when character is jumping */
    if (jump) {
        slidingImages = 0;
        slide = false;
        slideEachAnimation = false;

        if (jumpingImages >= 5 && !jumpEachAnimation) {
            jumpingImages = 0;
            jump = false;
        } else {
            if (!jumpEachAnimation) {
                jumpingImages++;
            }
        }

        
        if (jumpingImages == 1) { /** prepares to jump */
            charIsJumping(10, false, 0, false); //whenSwitch, yChanges, yHowMuch, backToDefault

            image(char_jumping_1, /* img */
                charX, charY, /* x, y */
                (char_jumping_1.width * charH)/char_jumping_1.height, charH) /* w, h */
        }

        else if (jumpingImages == 2) { /** jumps */
            charIsJumping(20, true, -5, false); //whenSwitch, yChanges, yHowMuch, backToDefault
            
            image(char_jumping_2, /* img */
                charX, charY, /* x, y */
                (char_jumping_2.width * charH)/char_jumping_2.height, charH) /* w, h */
        }

        else if (jumpingImages == 3) { /** is at the highest point of jump */
            charIsJumping(20, true, -1, false); //whenSwitch, yChanges, yHowMuch, backToDefault
        
            image(char_jumping_3, /* img */
                charX, charY, /* x, y */
                (char_jumping_3.width * charH)/char_jumping_3.height, charH) /* w, h */
        }

        else if (jumpingImages == 4) { /** goes down */
            charIsJumping(30, true, 0, true); //whenSwitch, yChanges, yHowMuch, backToDefault

            image(char_jumping_1, /* img */
                charX, charY, /* x, y */
                (char_jumping_1.width * charH)/char_jumping_1.height, charH) /* w, h */
        }
        
        else { /** feet back on the floor, re-adjusts */
            charIsJumping(15, false, 0, false); //whenSwitch, yChanges, yHowMuch, backToDefault

            image(char_jumping_4, /* img */
                charX, charY, /* x, y */
                (char_jumping_4.width * charH)/char_jumping_4.height, charH) /* w, h */
        }

        char_position.w = (char_jumping_1.width * charH)/char_jumping_1.height;
        char_position.h = charH;
        char_position.x = charX + char_position.w/2;
        char_position.y = charY + char_position.h/2;

    }
}

/**
 * function that makes the character slide
 */
function charSlide() {
    if (slide) {
        charY = charYDefault;
        jumpingImages = 0;
        jump = false;
        jumpEachAnimation = false;

        if (slidingImages >= 3 && !slideEachAnimation) {
            slidingImages = 0;
            slide = false;
        } else {
            if (!slideEachAnimation) {
                slidingImages++;
            }

            if (slidingImages == 1) {
                charIsSliding(10); //whenSwitch
    
                image(char_jumping_4, /* img */
                    charX, charYDefault, /* x, y */
                    (char_jumping_4.width * charH)/char_jumping_4.height, charH) /* w, h */
            }
    
            else if (slidingImages == 2) {
                charIsSliding(30); //whenSwitch
    
                image(char_sliding_2, /* img */
                    charX, floorYPlacement-((char_sliding_2.height * charSlidingW)/char_sliding_2.width)/2, /* x, y */
                    charSlidingW, (char_sliding_2.height * charSlidingW)/char_sliding_2.width) /* w, h */
            }
    
            else {
                charIsSliding(10); //whenSwitch
    
                image(char_sliding_3, /* img */
                    charX, floorYPlacement-((char_sliding_3.height * charSlidingW)/char_sliding_3.width)/2, /* x, y */
                    charSlidingW, (char_sliding_3.height * charSlidingW)/char_sliding_3.width) /* w, h */
            }
        }

        char_position.w = charSlidingW;
        char_position.h = (char_sliding_3.height * charSlidingW)/char_sliding_3.width;
        char_position.x = charX + char_position.w/2;
        char_position.y = charSlidingY + char_position.h/2;
    }
}

/**
 * responsible for the run animation of the character (in the initial cutscene it is ALSO responsible for the pide's run animation)
 * @param {*} charImage image that's receiving the run animation (either character or pide)
 * @param {*} isChar either TRUE or FALSE. True if the image is of the character
 * @param {*} posX which coordinate of X is the image positioned at
 */
function animationRun(charImage, isChar, posX) {
    if (runSwitch) {
        runSwitch = false;
        runWhenSwitchStart = frameCount;    
    } else {
        runWhenSwitchEnd = frameCount + 5*gameSpeed;
        
        if (runWhenSwitchEnd - runWhenSwitchStart >= runWhenSwitch) {
            if (runningImages >= 3) {
                runningImages = 0;
            } else {
                runningImages++;
            }

            runSwitch = true;
        }
    }

    if (runningImages == 0) {
        image(charImage[0], /* img */
            posX, charYDefault, /* x, y */
            (charImage[0].width * charH)/charImage[0].height, charH) /* w, h */
    } else if (runningImages == 1 || runningImages == 3) {
        image(charImage[1], /* img */
            posX, charYDefault, /* x, y */
            (charImage[1].width * charH)/charImage[1].height, charH) /* w, h */
    } else {
        image(charImage[2], /* img */
            posX, charYDefault, /* x, y */
            (charImage[2].width * charH)/charImage[2].height, charH) /* w, h */
    }

    if (isChar) {
        char_position.w = (char_running_M.width * charH)/char_running_M.height;
        char_position.h = charH;
        char_position.x = charX + char_position.w/2;
        char_position.y = charYDefault + char_position.h/2;
    }
}

function charIsJumping(whenSwitch, yChanges, yHowMuch, backToDefault) {
    if (!jumpEachAnimation) {
        if (backToDefault) {
            charYBackToDefault = (charYDefault - charY)/whenSwitch;
        }

        jumpEachAnimation = true;
        
        jumpWhenSwitch = whenSwitch; /** determines how long, in frames, one of the pics of the jump animation is on for */
        jumpWhenSwitchStart = frameCount;
    } else {
        jumpWhenSwitchEnd = frameCount;
        
        if (jumpWhenSwitchEnd - jumpWhenSwitchStart >= jumpWhenSwitch) {
            jumpEachAnimation = false;
        }
    }
    
    if (yChanges) {
        if (backToDefault) {
            charY = charY + (charYBackToDefault);
        } else {
            charY = charY + (yHowMuch);
        }
    }
}

function charIsSliding(whenSwitch) {
    if (!slideEachAnimation) {
        slideEachAnimation = true;
        
        slideWhenSwitch = whenSwitch; /** determines how long, in frames, one of the pics of the slide animation is on for */
        slideWhenSwitchStart = frameCount;
    } else {
        slideWhenSwitchEnd = frameCount;

        if (slideWhenSwitchEnd - slideWhenSwitchStart >= slideWhenSwitch) {
            slideEachAnimation = false;
        }
    }
}

/**
 * function that makes the character fall/trip depending on the object hit
 */
function charFails(typeOfFall) {
    if (failingImages < 3) {
        if (!failEachAnimation) {
            failingImages++;
        }
    }

    let arrayFallingImage;
    if (typeOfFall == 1) {
        arrayFallingImage = char_fail.forward;
    } else {
        arrayFallingImage = char_fail.backwards;
    }
    
    if (failingImages == 1) { /** initial tripping/bumping head */
        let finalY = charY+charH/2-((char_tripping_forward_1.width * charH)/char_tripping_forward_1.height)/2
        charIsFailing(arrayFallingImage[0], 20, true, 30, 2, typeOfFall, finalY);

    } else if (failingImages == 2) { /** mid fall */
        let finalY = charY+charH/2-((char_tripping_forward_2.width * charH)/char_tripping_forward_2.height)/2
        charIsFailing(arrayFallingImage[1], 15, true, 60, 4, typeOfFall, finalY);

    } else { /** laying on the floor */
        let finalY = charY+charH/2-((char_tripping_forward_3.width * charH)/char_tripping_forward_3.height)/2
        charIsFailing(arrayFallingImage[2], 10, false, 0, 0, typeOfFall, finalY);
    }
}

/**
 * Function responsible for making the character actually visibly fall
 * @param {*} failImage the image of the animation that's going to be displayed
 * @param {*} whenSwitch how many frames the image "failImage" is on screen for
 * @param {*} angleChanges either TRUE or FALSE. If true, it means that the image "failImage" must rotate
 * @param {*} angleHowMuch how many degrees is the image rotating to simulate a fall
 * @param {*} speedX how far ahead, in X, each image moves (since the scenery stops moving, the character as to be the one moving instead to give the feeling of movement)
 * @param {*} directionFall either "1" or "-1". If "1", the character rotates moves, in X, to the right
 * @param {*} finalY calculated through the height and width of the image, this variable is where the final Y of the character must be on the final frame 
 */
function charIsFailing(failImage, whenSwitch, angleChanges, angleHowMuch, speedX, directionFall, finalY) {
    if (!failEachAnimation) {
        failEachAnimation = true;
        
        hitWhenSwitch = whenSwitch; /** determines how long, in frames, one of the pics of the jump animation is on for */
        hitObstacleStart = frameCount;

        if (angleChanges) {
            anglePerFrame = angleHowMuch / whenSwitch; /** having in mind the total amount of degrees chosen for the image to rotate, "anglePerFrame" determines how many degrees per frame are needed to achieve such total amount of degrees */

        }
    } else {
        hitObstacleEnd = frameCount;
        
        if (hitObstacleEnd - hitObstacleStart >= hitWhenSwitch) {
            failEachAnimation = false;
        }
    }

    if (angleChanges) {
        totalAngle += anglePerFrame * directionFall;

        if (directionFall == 1) {
            charX += (5+speedX) * gameSpeed * directionFall; /** since environment stops moving, gives the movement that scenery had to the character instead, with extra speed (speedX) to make it dramatic */
        }
        
        push();
        angleMode(DEGREES);
        translate(charX, charY);
        rotate(totalAngle);
        image(failImage, /* img */
            0, 0, /* x, y */
            (failImage.width * charH)/failImage.height, charH) /* w, h */ 
        pop();

    } else {
        push();
        angleMode(DEGREES);
        translate(charX, finalY);
        rotate(90 * directionFall);
        image(failImage, /* img */
            0, 0, /* x, y */
            (failImage.width * charH)/failImage.height, charH) /* w, h */ 
        pop();
    }
}

class Floor {
    constructor(floorX, whichScenery) {
        this.floorX = floorX; //width + (floorW/2) totalmente gone -------- width - (floorW/2) aparece a imagem toda encostada à direita
        this.whichScenery = whichScenery;
    }
    
    update() {
        this.floorX -= 5 * gameSpeed;
        /** "minus" to make the floor move from right to left
         * "5" is the default speed
         * "speed" is used to make it go left faster each frame as the original "gameSpeed" variable increases
         */
    }
    
    display() { /** makes the obstacle appear on the canvas */
        if (this.whichScenery == "subway") {
            image(floor_subway, /* img */
                this.floorX, floorY, /* x, y */
                floorW, floorH) /* w, h */

            image(floor_subway_bg, /* img */
                this.floorX, floorY/2+floorH/2-((floor_subway_bg.height*floorW)/floor_subway_bg.width)/2, /* x, y */
                floorW, (floor_subway_bg.height*floorW)/floor_subway_bg.width) /* w, h */
        }
    }
    
    offscreen() {
        /** if obstacle left the screen */
        return (this.floorX + (floorW/2) < 0);
    }
}

class Obstacle {
    constructor(speed, width, obsY, obsW, obsH, typeOfObstacle) {
        this.speed = speed;
        this.obsY = obsY;
        this.obsW = obsW;
        this.obsH = obsH;
        this.typeOfObstacle = typeOfObstacle;

        this.obsX = width + (obsW/2);
    }
    
    update() {
        this.obsX -= 5 * this.speed;
        /** "minus" to make the object move from right to left
         * "5" is the default speed
         * "speed" is used to make it go left faster each frame as the original "gameSpeed" variable increases
         */
    }
    
    display(element) { /** makes the obstacle appear on the canvas */
        if (this.typeOfObstacle == 1) {
            if (animalSwitch) {
                image(dog_running_1,
                    this.obsX, this.obsY,
                    this.obsW, (this.obsW*dog_running_1.height)/dog_running_1.width)
            } else {
                image(dog_running_2,
                    this.obsX, this.obsY,
                    this.obsW, (this.obsW*dog_running_1.height)/dog_running_1.width)
            }
        } else {
            if (animalSwitch) {
                image(seagull_1,
                    this.obsX, this.obsY,
                    this.obsW, (this.obsW*seagull_1.height)/seagull_1.width)
            } else {
                image(seagull_2,
                    this.obsX, this.obsY,
                    this.obsW, (this.obsW*seagull_1.height)/seagull_1.width)
            }
        }

        /* OBSTACLE AND CHARACTER DEBUG HELP */
        // fill("#FF0000")
        // rect(this.obsX-this.obsW/2*0.9, this.obsY-this.obsH/2, 10, 10)
        // rect(element.x, element.y, 10, 10)

    }
    
    offscreen() {
        /** if obstacle left the screen */
        return (this.obsX+this.obsW/2 < 0);
    }
  
    collides(element) {
        /* "0.9" is the "tolerance of hit" */
        if (this.typeOfObstacle == 1 /** obstacle that player has to jump over */
            && this.obsX - this.obsW/2 < element.x*0.9 /** if farthest point on the left of obstacle is "more to the left" than the farthest point to the right of the character */
            && this.obsX + this.obsW/2 > element.x - element.w*0.9 /** if farthest point on the right of obstacle is "more to the right" than the farthest point to the left of the character */
            && this.obsY - this.obsH/2 < element.y) { /** if the highest point of the obstacle is ABOVE(<) the lowest point of the character */
            //this.obsY - this.obsH < element.y + element.h) {

            obstacleHit = 1;

            return true;
        } else if (this.typeOfObstacle == 2 /** obstacle that player has to roll under */
            && this.obsX - this.obsW/2 < element.x*0.9 /** if farthest point on the left of obstacle is "more to the left" than the farthest point to the right of the character */
            && this.obsX + this.obsW/2 > element.x - element.w*0.4 /** if farthest point on the right of obstacle is "more to the right" than the farthest point to the left of the character */
            && this.obsY + this.obsH/2 >= element.y - element.h) { /** if the lowest point of the obstacle is BELOW(>) the highest point of the character */

            obstacleHit = 2;

            return true;
        } else {
            return false;
        }
    }
}