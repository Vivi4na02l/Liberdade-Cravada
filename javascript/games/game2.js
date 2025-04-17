/** game variables */
let gameSpeed = 1, ms;

/** character variables */
let charX, charY, charW, charH, charYDefault;
let charSlidingH, charSlidingY;
let char_running_R, char_sliding, char_mid_sliding, char_jumping;

/** floor variables */
let floorX, floorY, floorH;

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
}

export function game2_setup() {
    //* floor
    floorH = height*0.4;
    floorX = 0 + (width/2);
    floorY = height*0.7;

    //* character
    charW = width*0.05;
    charH = width*0.1;
    charX = width*0.15;
    charY = floorY - charH/2;
    charYDefault = charY;

    charSlidingH = charH * 0.6;
    charSlidingY = floorY - charSlidingH/2;

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorY - obsH/2;

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

        char_jumping.resize(0, charH * 0.666);
        image(char_jumping, charX, charY)

    /** when character is sliding */
    } else if (slide && !jump) {
        endSlide = frameCount;

        if (endSlide - startSlide >= timeOfSlide) {
            slide = false;
        } else {
            char_sliding.resize(0, charSlidingH);
            image(char_sliding, charX, charSlidingY)
        }

    /** when character is just running (default) */
    } else {
        char_running_R.resize(0, charH);
        image(char_running_R, charX, charYDefault)
    }


    //************ FLOOR */
    rect(floorX, floorY + (floorH/2), width, floorH) /* x,y,w,h */

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