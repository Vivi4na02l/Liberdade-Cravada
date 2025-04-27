/** game rules and scenery variables */
let gameOver = false;
let points = 0;
let gameSpeed = 1;
let scenery = "subway", newScenery = "default";
let fade = 0, fadeIn = true;
let backgroundW, backgroundH, backgroundX, backgroundY;

/** transitions between scenarios */
let subwayX, subwayY, subwayW, subwayH;

let floor_subway, floor_subway_bg, bg_front_subway, bg_subway;
let floors = [];

let floor_lisbon;

/** character variables */
let charX, charY, charW, charH, charYDefault, charYBackToDefault;
let charSlidingW, charSlidingH, charSlidingY;
let char_running_R, char_running_M, char_running_L;
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

export function game2_preload() {
    char_running_R = loadImage('../images/games/characters/char_running_R.png');
    char_running_M = loadImage('../images/games/characters/char_running_M.png');
    char_running_L = loadImage('../images/games/characters/char_running_L.png');

    char_sliding_1 = loadImage('../images/games/characters/char_sliding_1.png');
    char_sliding_2 = loadImage('../images/games/characters/char_sliding_2.png');
    char_sliding_3 = loadImage('../images/games/characters/char_sliding_3.png');
    
    char_jumping_1 = loadImage('../images/games/characters/char_jumping_1.png');
    char_jumping_2 = loadImage('../images/games/characters/char_jumping_2.png');
    char_jumping_3 = loadImage('../images/games/characters/char_jumping_3.png');
    char_jumping_4 = loadImage('../images/games/characters/char_jumping_4.png');
    char_jumping_5 = loadImage('../images/games/characters/char_jumping_5.png');

    char_tripping_forward_1 = loadImage('../images/games/characters/char_tripping_forward_1.png');
    char_tripping_forward_2 = loadImage('../images/games/characters/char_tripping_forward_2.png');
    char_tripping_forward_3 = loadImage('../images/games/characters/char_tripping_forward_3.png');
    char_tripping_backwards_1 = loadImage('../images/games/characters/char_tripping_backwards_1.png');
    char_tripping_backwards_2 = loadImage('../images/games/characters/char_tripping_backwards_2.png');
    char_tripping_backwards_3 = loadImage('../images/games/characters/char_tripping_backwards_3.png');

    floor_subway = loadImage('../images/games/scenery/floor_subway.png');
    floor_subway_bg = loadImage('../images/games/scenery/floor_subway_bg.png');
    bg_front_subway = loadImage('../images/games/scenery/bg_front_subway.png');
    bg_subway = loadImage('../images/games/scenery/bg_subway_blurred.png');

    floor_lisbon = loadImage('../images/games/scenery/floor_lisbon.png');
}

export function game2_setup() {
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

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorYPlacement - obsH/2;

    tallObsW = width*0.08;
    tallObsH = width*0.03;
    tallObsX = width*0.7;
    tallObsY = floorYPlacement - charH;

    subwayH = height/1.7;
    subwayW = (bg_front_subway.width*(subwayH))/bg_front_subway.height;
    subwayX = width+subwayW/2;
    subwayY = height-(subwayH)/2;

    //* GAME OVER
    char_fail = {
        "forward": [char_tripping_forward_1, char_tripping_forward_2, char_tripping_forward_3],
        "backwards": [char_tripping_backwards_1, char_tripping_backwards_2, char_tripping_backwards_3]
    }

    imageMode(CENTER);
    rectMode(CENTER);
}

export function game2_draw() {
    noStroke();
    background('#aaffff');

    //************ MOVEMENT and SCENERY */
    if (!gameOver) {
        gameSpeed += 0.0001;
        backgroundX -= 0.25 * gameSpeed;
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
        if (!gameOver) {
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
    if (!gameOver) {
        /** when character is jumping */
        charJump();
        /** when character is sliding */
        charSlide();
        
        /** when character is just running (default) */
        if (!jump && !slide) {
            charRun();
        }

    /** character falling/tripping down */
    } else {
        if (obstacleHit == 1) { /* obstacle to jump over (character trips if failed to jump) */
            charFails(1);
        } else { /* obstacle to roll under (character falls backwards if failed to roll) */
            charFails(-1);
        }
    }

    //************ OBSTACLES */
    /** spawns the first obstacle */
    if (frameCount == 10) {
        typeOfObstacle = Math.ceil(Math.random() * 2) /** 1,2,3 */ //* MUDAR PARA 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333 */

        if (typeOfObstacle == 1) {
            obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH, typeOfObstacle));
        } else if (typeOfObstacle == 2) {
            obstacles.push(new Obstacle(gameSpeed, width, tallObsY, tallObsW, tallObsH, typeOfObstacle));
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (!gameOver) {
            obstacles[i].update();
        }
        obstacles[i].display(char_position);
        if (obstacles[i].collides(char_position)) {
            gameOver = true;
        };

        /** if obstacle is offscreen, delete it and add a new one */
        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);

            typeOfObstacle = Math.ceil(Math.random() * 2) /** 1,2,3 */ //* MUDAR PARA 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333 */
            
            if (typeOfObstacle == 1) {
                obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH, typeOfObstacle));
            } else if (typeOfObstacle == 2) {
                obstacles.push(new Obstacle(gameSpeed, width, tallObsY, tallObsW, tallObsH, typeOfObstacle));
            }
        }
    }


    //************ TRANSITIONS */
    
    if (((backgroundX + backgroundW)-width*0.8) <= width) {
        newScenery = sceneryTransition(scenery);

        if (newScenery != undefined) {
            scenery = newScenery;    
        }

        if (scenery == "subway") {
            /** subway appears to cover most elements on the screen */
            image(bg_front_subway, /* img */
                subwayX, subwayY, /* x, y */
                subwayW, subwayH) /* w, h */   

            subwayX -= 20 * gameSpeed;
        }
    }

    //************ POINTS */
    if (!gameOver) {
        points = frameCount;
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textAlign(CENTER, CENTER)
    text(points, width/2, height*0.05);
}

export function game2_keyPressed() {
    
}

export function game2_keyReleased() {
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
 * function that makes the character run
 */
function charRun() {
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
        image(char_running_R, /* img */
            charX, charYDefault, /* x, y */
            (char_running_R.width * charH)/char_running_R.height, charH) /* w, h */
    } else if (runningImages == 1 || runningImages == 3) {
        image(char_running_M, /* img */
            charX, charYDefault, /* x, y */
            (char_running_M.width * charH)/char_running_M.height, charH) /* w, h */
    } else {
        image(char_running_L, /* img */
            charX, charYDefault, /* x, y */
            (char_running_L.width * charH)/char_running_L.height, charH) /* w, h */
    }

    char_position.w = (char_running_M.width * charH)/char_running_M.height;
    char_position.h = charH;
    char_position.x = charX + char_position.w/2;
    char_position.y = charYDefault + char_position.h/2;
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

function sceneryTransition(scenery) {
    if (scenery == "subway") {
        if (subwayX <= width*0.4) { /** when the middle of the subway reaches 60% of the screen */
            fill(0, 0, 0, fade)
            rect(width/2, height/2, width, height)

            if (fade <= 255 && fadeIn) { /** black screen fades in and covers everything but the subway */
                fade += 5
            } else if (fade >= 250 || (!fadeIn && fade > 0)) {
                fadeIn = false;
                
                scenery = "";
                fade -= 5;
            } else if (fade <= 0) {
                if (subwayX + subwayW/2 < 0) { /** when the end of the subway is no longer visible */
                    subwayX = width+subwayW/2; /* reset OG subway position for next time this scene comes */
                    fadeIn = true;
                    backgroundX = backgroundW/2; /** resets the initial position of the background for the following scene */
                    return "Lisboa" /** changes to next scenery */ //* MUDAR PARA RANDOM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
                }
            }
        }
    }
}

class Floor {
    constructor(floorX, whichScenery) {
        this.floorX = floorX; //width + (floorW/2) totalmente gone -------- width - (floorW/2) aparece a imagem toda encostada à direita
        this.whichScenery = whichScenery;
    }
    
    update() {
        // if (previousFloorX == "none") {
        //     this.floorX = width - (floorW/2)
        // }

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
        } else if (this.whichScenery == "Lisboa") {
            image(floor_lisbon, /* img */
                this.floorX, floorY, /* x, y */
                floorW, floorH) /* w, h */
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
        rect(this.obsX, this.obsY, this.obsW, this.obsH)

        /* OBSTACLE AND CHARACTER DEBUG HELP */
        // fill("#FF0000")
        // rect(this.obsX-this.obsW/2, this.obsY-this.obsH/2, 10, 10)
        // rect(element.x-element.w/2, element.y, 10, 10)

    }
    
    offscreen() {
        /** if obstacle left the screen */
        return (this.obsX < 0);
    }
  
    collides(element) {
        /* "0.9" is the "tolerance of hit" */
        if (typeOfObstacle == 1 /** obstacle that player has to jump over */
            && this.obsX - this.obsW/2 < element.x*0.9 /** if farthest point on the left of obstacle is "more to the left" than the farthest point to the right of the character */
            && this.obsX + this.obsW/2 > element.x - element.w*0.9 /** if farthest point on the right of obstacle is "more to the right" than the farthest point to the left of the character */
            && this.obsY - this.obsH/2 < element.y) { /** if the highest point of the obstacle is ABOVE(<) the lowest point of the character */
            //this.obsY - this.obsH < element.y + element.h) {

            obstacleHit = 1;

            return true;
        } else if (typeOfObstacle == 2 /** obstacle that player has to roll under */
            && this.obsX - this.obsW/2 < element.x*0.9 /** if farthest point on the left of obstacle is "more to the left" than the farthest point to the right of the character */
            && this.obsX + this.obsW/2 > element.x - element.w*0.9 /** if farthest point on the right of obstacle is "more to the right" than the farthest point to the left of the character */
            && this.obsY + this.obsH/2 >= element.y - element.h) { /** if the lowest point of the obstacle is BELOW(>) the highest point of the character */

            obstacleHit = 2;

            return true;
        } else {
            return false;
        }
    }
}