let canvasW, canvasH;

import {
    censorship_preload,
    censorship_setup,
    censorship_draw,
    censorship_keyPressed,
    censorship_keyReleased,
} from './games/censorship.js';

import {
    persecution_preload,
    persecution_setup,
    persecution_draw,
    persecution_keyPressed,
    persecution_keyReleased,
    persecution_mouseClicked,
} from './games/persecution.js';

import {
    basketFood_preload,
    basketFood_setup,
    basketFood_draw,
    basketFood_keyPressed,
    basketFood_keyReleased,
    basketFood_mouseClicked,
} from './games/basketFood.js';

import {
    bricks_preload,
    bricks_setup,
    bricks_draw,
    bricks_keyPressed,
    bricks_keyReleased,
    bricks_mouseClicked,
} from './games/bricks.js';

//* PREVENTS PAGE SCROLLING WHEN SPACEBAR OR ANY ARROW KEY IS PRESSED */
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

let game = sessionStorage.getItem("game");

function preload() {
    if (game == "censorship") {
        censorship_preload();
    } else if (game == "persecution") {
        persecution_preload();
    } else if (game == "basketFood") {
        basketFood_preload();
    } else if (game == "bricks") {
        bricks_preload();
    }
}

function setup() {
    //* CREATING CANVAS */
    canvasW = document.querySelector('#gameP5js').offsetWidth;
    canvasH = document.querySelector('#gameP5js').offsetHeight;

    let gameCanvas = createCanvas(canvasW, canvasH);
    gameCanvas.parent("gameP5js")

    
    //* default settings to rotate images */
    imageMode(CENTER);
    angleMode(DEGREES);

    if (game == "censorship") {
        censorship_setup();
    } else if (game == "persecution") {
        persecution_setup();
    } else if (game == "basketFood") {
        basketFood_setup();
    } else if (game == "bricks") {
        bricks_setup();
    }
}

function draw() {
    clear();
    background("#000");

    if (game == "censorship") {
        censorship_draw();
    } else if (game == "persecution") {
        persecution_draw();
    } else if (game == "basketFood") {
        basketFood_draw();
    } else if (game == "bricks") {
        bricks_draw();
    }
}

function keyPressed() {
    if (game == "censorship") {
        censorship_keyPressed();
    } else if (game == "persecution") {
        persecution_keyPressed();
    } else if (game == "basketFood") {
        basketFood_keyPressed();
    } else if (game == "bricks") {
        bricks_keyPressed();
    }
}

function keyReleased() {
    if (game == "censorship") {
        censorship_keyReleased();
    } else if (game == "persecution") {
        persecution_keyReleased();
    } else if (game == "basketFood") {
        basketFood_keyReleased();
    } else if (game == "bricks") {
        bricks_keyReleased();
    }
}

function mouseClicked() {
    if (game == "persecution") {
        persecution_mouseClicked();
    } else if (game == "basketFood") {
        basketFood_mouseClicked();
    }
}

window.preload = preload
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
window.mouseClicked = mouseClicked;