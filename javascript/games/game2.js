/** game variables */
let gameSpeed = 1, ms, sec;

/** character variables */
let charX, charY, charW, charH;

/** floor variables */
let floorX, floorY, floorH;

/** obstacles variables */
let obsX, obsY, obsW, obsH;
let obstacles = [];

/** movement keyboard variables */
let goingLeft = false, goingRight = false;

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

    //* obstacle
    obsW = width*0.08;
    obsH = width*0.03;
    obsX = width*0.7;
    obsY = floorY - obsH/2;

    //* game variables
    ms = millis();
    sec = ms / 1000;

    rectMode(CENTER);
}

export function game2_draw() {
    background('#aaffff')

    //* variables responsible for the movement of the scenario */
    gameSpeed += 0.001;
    obsX -= 5 * gameSpeed;

    //* character */
    rect(charX, charY, charW, charH) /* x,y,w,h */

    //* floor */
    rect(floorX, floorY + (floorH/2), width, floorH) /* x,y,w,h */

    //* obstacles */
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
    if (keyCode === LEFT_ARROW) {
        goingLeft = true;
    }
      
    if (keyCode === RIGHT_ARROW) {
        goingRight = true;
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

export function game2_keyReleased() {
    if (keyCode === LEFT_ARROW) {
        goingLeft = false;
    }
    
    if (keyCode === RIGHT_ARROW) {
        goingRight = false;
    }

    if (key === ' ') {
        //* ESPAÇO
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
    
    display() {
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