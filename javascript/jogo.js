let canvasW, canvasH;

let game = sessionStorage.getItem("game");
if (game == null) {
    window.location.href = "./JogosEducativos.html";
}

let games = [
    {
        game: "persecution",
        title: "Fugitivo",
        description: "Estavas a apreciar a paisagem na ponte com demasiados amigos, e agora o governo considera-te uma ameaça. Um agente da PIDE começa a seguir-te. Se fores apanhado, sabes que vais preso. Corre!",
        controls: [{src: "../images/website/iconography/escape.png",
                    instruction: "Para pausar o jogo."},
                    {src: "../images/website/iconography/spacebar.png",
                    instruction: "Para saltar."},
                    {src: "../images/website/iconography/arrowDown.png",
                    instruction: "Para deslizar."}],
        hand: [{src: "../images/website/games/fugitivoJump.mp4",
                instruction: "Para saltar, move a mão para cima da linha tracejada superior."},
                {src: "../images/website/games/fugitivoSlide.mp4",
                instruction: "Para deslizar, move a mão para baixo da linha tracejada inferior."}]
    },{
        game: "bricks",
        title: "Demolição do muro",
        description: "Já estás há tanto tempo neste regime opressivo que a tua própria mente criou um muro que te impede de seres quem realmente és. Derruba esse muro, acertando nos tijolos simbólicos da opressão, quanto mais, melhor!",
        controls: [{src: "../images/website/iconography/escape.png",
                    instruction: "Para pausar o jogo."},
                    {src: "../images/website/iconography/spacebar.png",
                    instruction: "Para lançar a pedra."},
                    {src: "../images/website/iconography/arrowRight.png",
                    instruction: "Para mover para a direita."},
                    {src: "../images/website/iconography/arrowLeft.png",
                    instruction: "Para mover para a esquerda."}],
        hand: [{src: "../images/website/games/demolicaoMuro.mp4",
                instruction: "A fisga segue o movimento lateral da tua mão."}]
    },{
        game: "censorship",
        title: "Lápis azul",
        description: "És um agente da PIDE e, umas das tuas funções é censurar tudo o que consideres uma ameaça aos ideais do Estado. Aponta o lápis azul às palavras proibidas e censura-as.",
        controls: [{src: "../images/website/iconography/spacebar.png",
                    instruction: "Para soltar pigmento azul."},
                    {src: "../images/website/iconography/arrowRight.png",
                    instruction: "Para apontar mais para a direita."},
                    {src: "../images/website/iconography/arrowLeft.png",
                    instruction: "Para apontar mais para a direita."}],
        hand: [{src: "../images/website/games/lapisAzulMove.mp4",
                instruction: "Para orientar o lápis, move a mão sobre a seta da direção pretendida."},
                {src: "../images/website/games/lapisAzulShoot.mp4",
                instruction: 'Para disparar, passa a mão por cima do botão "Disparar".'}]
    },{
        game: "basketFood",
        title: "Tempos difíceis",
        description: "Nasceste durante o Salazarismo, numa família pobre. A tua família tem dificuldade em sustentar-se, e a comida, por vezes, escasseia. Tenta recolher o máximo de comida que conseguires para ti e para a tua família!",
        controls: [{src: "../images/website/iconography/escape.png",
                    instruction: "Para pausar o jogo."},
                    {src: "../images/website/iconography/arrowRight.png",
                    instruction: "Para mover para a direita."},
                    {src: "../images/website/iconography/arrowLeft.png",
                    instruction: "Para mover para a esquerda."}],
        hand: [{src: "../images/website/games/temposDificeis.mp4",
                instruction: "O cesto segue o movimento lateral da tua mão."}]
    },
];

updateInfo();
let sltControls = document.querySelector("#sltControls");
sltControls.addEventListener("click", () => {
    if (sltControls.value == "keyboard") {
        for (const hr of document.querySelectorAll(".hr")) {
            hr.style.width = "40%";
        }

        updateInfo("keyboard");
    } else if (sltControls.value == "hand") {
        for (const hr of document.querySelectorAll(".hr")) {
            hr.style.width = "30%";
        }

        updateInfo("hand");
    } else {
        updateInfo("tut");
    }
})

function updateInfo(controlSelected) {
    let pos = games.findIndex(eachGame => eachGame.game == game);

    document.querySelector('#gameTitle').innerHTML = games[pos].title;
    document.querySelector('#gameDescription').innerHTML = games[pos].description;

    if (controlSelected == "keyboard") {
        let html = '';
        for (const control of games[pos].controls) {
            html += `
                <div class="w100 dflex fdc jcc aic">
                    <img src="${control.src}" height="50px">
                    <p id="gameDescription" class="m0 p0 IBM fontNormalSize2">${control.instruction}</p>
                </div>
            `
        }

        document.querySelector('#handText').style.display = "none";
        document.querySelector('#controls').innerHTML = html;
    } else if (controlSelected == "hand") {
        let html = '';
        for (const control of games[pos].hand) {
            html += `
                <div class="w100 dflex fdc jcc aic">
                    <video height="200" autoplay loop>
                        <source src="${control.src}" type="video/mp4">
                    </video>
                    <p id="gameDescription" class="m0 p0 IBM fontNormalSize2" style="marginTop: 10px">${control.instruction}</p>
                </div>
            `
        }

        document.querySelector('#handText').style.display = "block";
        document.querySelector('#controls').innerHTML = html;
    } else {
        document.querySelector('#handText').style.display = "none";
        document.querySelector('#controls').innerHTML = '<div></div>';
    }
    
    
};

import {
    censorship_preload,
    censorship_setup,
    censorship_draw,
    censorship_keyPressed,
    censorship_keyReleased,
    censorShip_mouseClicked,
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
    //* CREATING CANVAS */                                       offset - y
    canvasW = document.querySelector('#gameP5js').offsetWidth; //1920 - 920
    canvasH = (document.querySelector('#gameP5js').offsetWidth*920)/1920;

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
    } else if (game == "censorship") {
        censorShip_mouseClicked();
    } else if (game == "bricks") {
        bricks_mouseClicked();
    }
}

window.preload = preload
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
window.mouseClicked = mouseClicked;