/** game rules and scenery variables */
let gameSpeed = 1, ms;
let backgroundW, backgroundH, backgroundX, backgroundY;

let floor_subway, floor_subway_bg, bg_subway;

/** character variables */
let charX, charY, charW, charH, charYDefault;
let charSlidingH, charSlidingY;
let char_running_R, char_sliding, char_mid_sliding, char_jumping; //images

/** floor variables */
let floorX, floorY, floorW, floorH, floorYPlacement;

/** obstacles variables */
let obsX, obsY, obsW, obsH;
let obstacles = [];

/** movement keyboard variables */
let startJumpCounter, endJumpCounter, howLongJump, jump = false, isHovering = false, isHoveringStart, isHoveringShouldEndShort = 15, isHoveringShouldEndLong = 35, isJumpingDown = false;
let slide = false, startSlide, endSlide, timeOfSlide = 50;

export function game2_preload() {
    char_running_R = loadImage('../images/games/characters/char_running_R.png');
    char_sliding = loadImage('../images/games/characters/char_sliding.png');
    char_mid_sliding = loadImage('../images/games/characters/char_mid_sliding.png');
    char_jumping = loadImage('../images/games/characters/char_jumping.png');

    floor_subway = loadImage('../images/games/scenery/floor_subway.png');
    floor_subway_bg = loadImage('../images/games/scenery/floor_subway_bg.png');
    bg_subway = loadImage('../images/games/scenery/bg_subway_blurred.png');
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
    floorX = floorW/2;
    floorY = height - floorH/2;
    floorYPlacement = floorY - floorH/4;

    //* character
    charW = width*0.1;
    charH = width*0.15;
    charX = width*0.2;
    charY = floorYPlacement - charH/2;
    charYDefault = charY;

    charSlidingH = charH * 0.6;
    charSlidingY = floorYPlacement - charSlidingH/2;

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorYPlacement - obsH/2;

    //* game variables
    ms = millis();

    imageMode(CENTER);
    rectMode(CENTER);
}

export function game2_draw() {
    background('#aaffff')

    //************ MOVEMENT and SCENERY */
    gameSpeed += 0.0001;
    obsX -= 5 * gameSpeed;

    /** BACKGROUND */
    image(bg_subway, /* img */
        backgroundX, backgroundY*0.8, /* x, y */
        backgroundW, backgroundH) /* w, h */
    
    //************ FLOOR */
    image(floor_subway, /* img */
        floorX, floorY, /* x, y */
        floorW, floorH) /* w, h */

    image(floor_subway_bg, /* img */
        floorX, floorY/2+floorH/2-((floor_subway_bg.height*floorW)/floor_subway_bg.width)/2, /* x, y */
        floorW, (floor_subway_bg.height*floorW)/floor_subway_bg.width) /* w, h */


    //************ CHARACTER */

    /** when character is jumping */

//if para variavel jump ter imagem de mid jump, if variavel is hovering ter a imagem do actual jumping


    if (jump && !slide) { 
        /** longest jump (activated by user pressing the spacebar long enough) */
        if (howLongJump >= 29) {
            charIsJumping(0.1, isHoveringShouldEndLong)
        } else if (howLongJump >= 15 && howLongJump < 29) {
            charIsJumping(0.1, isHoveringShouldEndShort)
        } else {
            charIsJumping(0.05, isHoveringShouldEndShort)
        }

        image(char_jumping, /* img */
            charX, charY, /* x, y */
            (char_jumping.width * (charH*0.666))/char_jumping.height, charH*0.666) /* w, h */

    /** when character is sliding */
    } else if (slide && !jump) {
        endSlide = frameCount;

        if (endSlide - startSlide >= timeOfSlide) {
            slide = false;
        } else {
            image(char_sliding, /* img */
                charX, charSlidingY, /* x, y */
                (char_sliding.width * charSlidingH)/char_sliding.height, charSlidingH) /* w, h */
        }

    /** when character is just running (default) */
    } else {
        image(char_running_R, /* img */
            charX, charYDefault, /* x, y */
            (char_running_R.width * charH)/char_running_R.height, charH) /* w, h */
    }

    //************ OBSTACLES */
    /** spawns the first obstacle */
    if (frameCount == 10) {
        obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH)); //createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].display();

        /** if obstacle is offscreen, delete it and add a new one */
        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
            obstacles.push(new Obstacle(gameSpeed, width, obsY, obsW, obsH)); //createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2
        }
    }
}

export function game2_keyPressed() {
    if (key === ' ') {
        startJumpCounter = frameCount; /** keeps in mind when user first pressed the spacebar down */
    }
}

export function game2_keyReleased() {
    if (key === ' ') {
        endJumpCounter = frameCount;
        howLongJump = endJumpCounter - startJumpCounter; /** calculates how long the user was pressing the spacebar */

        jump = true;
    }

    if (keyCode === DOWN_ARROW) {
        startSlide = frameCount;

        slide = true;
    }
}

function charIsJumping(heightOfJump, hoveringEnd) {
    if (!isJumpingDown) {
        charY -= 2;
        
        if (charY <= charYDefault-height*heightOfJump) {
            isHoveringStart = frameCount;

            isHovering = true;
            isJumpingDown = true;
        }  
    } else {
        if (isHovering) {
            if (frameCount - isHoveringStart >= hoveringEnd) {
                isHovering = false;
            }
        } else {
            charY += 2;

            if (charY >= charYDefault) {
                isJumpingDown = false;
                jump = false;
            }
        }
    }
}

class Obstacle {
    constructor(speed, width, obsY, obsW, obsH) { // pos, angle, hitbox
        this.speed = speed;
        this.obsY = obsY;
        this.obsW = obsW;
        this.obsH = obsH;

        this.obsX = width + (obsW/2);
    }
    
    update() {
        this.obsX -= 5 * this.speed;
        /** "minus" to make the object move from right to left
         * "5" is the default speed
         * "speed" is used to make it go left faster each frame as the original "gameSpeed" variable increases
         */
    }
    
    display() { /** makes the obstacle appear on the canvas */
        rect(this.obsX, this.obsY, this.obsW, this.obsH)
    }
    
    offscreen() {
        /** if obstacle left the screen */
        return (this.obsX < 0);
    }
  
    collides(element) {
        // if (!this.toRemove) {
        //     let d = dist(this.pos.x, this.pos.y, element.x, element.y);
    
        //     if (this.pos.x + this.radius > element.x && this.pos.x - this.radius < element.x + element.w &&
        //         this.pos.y + this.radius > element.y && this.pos.y - this.radius < element.y + element.h && !element.hasBeenHit) {
    
        //         element.hasBeenHit = true;
        //         this.toRemove = true;
        //         return true;
        //     } else {
        //         return false;
        //     }
            
        // } else {
        //     let d = dist(this.pos.x, this.pos.y, element.randomX, element.randomY);
        //     if (d <= this.radius + element.randomSize / 2 && !element.hasBeenHit) {
        //         element.hasBeenHit = true;
        //         this.moving = false;
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    }
}