/** game variables */
let gameSpeed = 1, ms;

/** character variables */
let charX, charY, charW, charH, charYDefault;

/** floor variables */
let floorX, floorY, floorH;

/** obstacles variables */
let obsX, obsY, obsW, obsH;
let obstacles = [];

/** movement keyboard variables */
let startJumpCounter, endJumpCounter, howLongJump, jump = false, isJumping = false, isHovering = false, isHoveringStart, isHoveringShouldEnd = 50, isJumpingDown = false;

export function game2_preload() {
    
}

export function game2_setup() {
    //* floor
    floorH = height*0.4;
    floorX = 0 + (width/2);
    floorY = height*0.6;

    //* character
    charW = width*0.05;
    charH = width*0.1;
    charX = width*0.15;
    charY = floorY - charH/2;
    charYDefault = charY;

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorY - obsH/2;

    //* game variables
    ms = millis();

    rectMode(CENTER);
}

export function game2_draw() {
    background('#aaffff')

    //************ variables responsible for the MOVEMENT of the SCENARIO */
    gameSpeed += 0.001;
    obsX -= 5 * gameSpeed;


    //************ CHARACTER */
    if (jump) {
        jump = false;
        isJumping = true;
        isJumpingDown = false;
        
        console.log(howLongJump);
    }

    if (isJumping) {
        if (howLongJump >= 29) {
            if (!isJumpingDown) {
                charY -= 2;
                
                if (charY <= charYDefault-height*0.1) {
                    isHoveringStart = frameCount;

                    isHovering = true;
                    isJumpingDown = true;
                }  
            } else {
                if (isHovering) {
                    if (frameCount - isHoveringStart >= isHoveringShouldEnd) {
                        isHovering = false;
                    }
                } else {
                    charY += 2;

                    if (charY >= charYDefault) {
                        isJumpingDown = false;
                        isJumping = false;
                    }
                }
            }
        }
    }

    rect(charX, charY, charW, charH) /* x,y,w,h */


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
        startJumpCounter = frameCount;
    }
}

export function game2_keyReleased() {
    if (key === ' ') {
        endJumpCounter = frameCount;
        howLongJump = endJumpCounter - startJumpCounter; /** determines how long the user was pressing jump */

        jump = true;
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