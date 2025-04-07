let canvasW, canvasH;

import {
    game1_preload,
    game1_setup,
    game1_draw,
    game1_keyPressed,
    game1_keyReleased,
} from './games/game1.js';

//* PREVENTS PAGE SCROLLING DOWN WHEN SPACEBAR IS PRESSED */
window.onkeydown = function(e) { 
    return !(e.keyCode == 32 && e.target == document.body);
}; 

let game = sessionStorage.getItem("game");

function preload() {
    if (game == "game1") {
        game1_preload();
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
    }
}

function draw() {
    clear();
    background("#000");

    if (game == "game1") {
        game1_draw();
    }
}

function keyPressed() {
    if (game == "game1") {
        game1_keyPressed();
    }
}

function keyReleased() {
    if (game == "game1") {
        game1_keyReleased();
    }
}

window.preload = preload
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;