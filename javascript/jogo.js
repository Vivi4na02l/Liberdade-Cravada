let canvasW, canvasH;

import {
    game1_preload,
    game1_setup,
    game1_draw,
    game1_keyPressed,
    game1_keyReleased,
} from './games/game1.js';

import {
    game2_preload,
    game2_setup,
    game2_draw,
    game2_keyPressed,
    game2_keyReleased,
    game2_mouseClicked,
} from './games/game2.js';

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
    if (game == "game1") {
        game1_preload();
    } else if (game == "game2") {
        game2_preload();
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

    if (game == "game1") {
        game1_setup();
    } else if (game == "game2") {
        game2_setup();
    } else if (game == "basketFood") {
        basketFood_setup();
    } else if (game == "bricks") {
        bricks_setup();
    }
}

function draw() {
    clear();
    background("#000");

    if (game == "game1") {
        game1_draw();
    } else if (game == "game2") {
        game2_draw();
    } else if (game == "basketFood") {
        basketFood_draw();
    } else if (game == "bricks") {
        bricks_draw();
    }
}

function keyPressed() {
    if (game == "game1") {
        game1_keyPressed();
    } else if (game == "game2") {
        game2_keyPressed();
    } else if (game == "basketFood") {
        basketFood_keyPressed();
    } else if (game == "bricks") {
        bricks_keyPressed();
    }
}

function keyReleased() {
    if (game == "game1") {
        game1_keyReleased();
    } else if (game == "game2") {
        game2_keyReleased();
    } else if (game == "basketFood") {
        basketFood_keyReleased();
    } else if (game == "bricks") {
        bricks_keyReleased();
    }
}

function mouseClicked() {
    if (game == "game2") {
        game2_mouseClicked();
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