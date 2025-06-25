let heart, heartW, lives = 7, points = 0;
let imgBgLvl1, imgNews, imgPencil;
let imgPencilRotate = -90;
let goingLeft = false, goingRight = false;
let gameOver = false, won = false;

let fadeTxtStart = 255, fadeTxtStartSwitch = false;
let fadeIn = 0;

let gameOverScreenStart = 0, gameOverScreen = false;

let isScenarioCreated;

let scribbles = [];
let scribbleCollided = false;
let fontPX, font;

let sentences = [{
    txt: "Para Salazar, desde que não pensem por si mesmas, as mulheres portuguesas são exaltadas como exemplo.",
    censured: ["desde", "que", "não", "pensem", "por", "si","mesmas,"]
  },
  {
    txt: "Os indivíduos exigem mais espaço para expressão e fim da regulação governamental.",
    censured: ["espaço", "para", "expressão", "e", "fim", "da"]
  },
  {
    txt: "A autoridade policial deteve vários militantes que protestavam pacificamente contra o regime. ",
    censured: ["pacificamente", "contra", "o", "regime."]
  },
//   {
//     txt: "Relativamente às guerras na rádio fala-se de vitórias, mas nos hospitais vê-se amputações.",
//     censured: ["mas", "nos", "hospitais", "vê-se", "amputações"]
//   },
//   {
//     txt: "Delgado, para o Estado, foi um dos opositores mais perigosos.",
//     censured: ["para", "o", "Estado,", "opositores"]
//   },
  { //* check */
    txt: "As escolas estão cheias de jovens, embora muitos desistam por precisarem trabalhar para sustentar a família.",
    censured: ["embora", "muitos", "desistam", "por", "precisarem", "trabalhar"]
  },
  {
    txt: "A biblioteca abriu portas, com livros restritos e vigilância constante. ",
    censured: ["com", "livros", "restritos", "e", "vigilância", "constante."]
  },
];

let wordsCensuredAll = [];

let randomNbr1, randomNbr2;
let marginLeftLeft, marginLeftTop, marginRightLeft, marginRightTop, maxWidth;

export function censorship_preload() {
    heart = loadImage('../images/games/elements/heart.png');
    
    imgBgLvl1 = loadImage('../images/games/scenery/bg_people_jornal.png');
    imgNews = loadImage('.././images/games/elements/jornal.png');
    imgPencil = loadImage('.././images/games/elements/blue_pencil.png');

    //* font */
    fontPX = loadFont('.././fonts/VT323/VT323-Regular.ttf');
    font = loadFont('.././fonts/Jersey_10/Jersey10-Regular.ttf');
};

export function censorship_setup() {
    rectMode(CENTER);

    heartW = width*0.03;
}

export function censorship_draw() {
    clear();

    noStroke();
    imgBgLvl1.resize(width, 0);
    image(imgBgLvl1, width-imgBgLvl1.width/2, height-(imgBgLvl1.height/2));
    imgNews.resize(0, height);
    image(imgNews, width/2, height-(imgNews.height/2));

    if (!gameOver) {
        if (scribbles.length != 0) {
            projectileCollidesElement(wordsCensuredAll);
        }

        for (let i = scribbles.length - 1; i >= 0; i--) {
            scribbles[i].update();
            scribbles[i].display();

            /** if scribble collides with basket */
            scribbleCollided = false;
            

            // if (scribbleCollided) {
            //     // scribbleCollided = false;
            // } else {
                if (scribbles[i].offscreen()) {
                    scribbles.splice(i, 1);
                    lives--;
                // };
            }
        }

        let allWordsCensured = (currentValue) => currentValue.hasBeenHit == true;
    
        //* if not every word has been censored yet */
        if (wordsCensuredAll.length == 0 || !wordsCensuredAll.every(allWordsCensured)) {
            newspaper();
        } else {  //* else */
            gameOver = true;
            won = true;
        }

        // projectileCollidesElement(wordsCensuredAll);
        movingPencil();
    } else { //* if game IS over */
        if (won) {
            gameEnded(false);
        } else {
            gameEnded(true);
        }
    }

    txtDisplay("Pontos: "+points, textWidth("Pontos: "+points)*1.5, heartW, 40, false); //width-heartW*i - heartW*0.1*i, heartW,

    if (lives == 0) {
        gameOver = true;
        won = false;
    }

    if (!gameOver) {
        livesDisplay();
    }
}

export function censorship_keyPressed() {
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

export function censorship_keyReleased() {
    if (keyCode === LEFT_ARROW) {
        goingLeft = false;
    }
    
    if (keyCode === RIGHT_ARROW) {
        goingRight = false;
    }

    if (key === ' ') { //isScribbleOut
        fill('#0099D6')
        scribbles.push(new Scribble(createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2));
    }
}

function newspaper() {
    fill('#000');
    textFont(fontPX, (25*0.8));
    textAlign(LEFT, TOP);
  
    if (!isScenarioCreated) {
        isScenarioCreated = true;
  
        randomNbr1 = Math.floor(Math.random() * sentences.length);
        for (const word of sentences[randomNbr1].censured) {
            wordsCensuredAll.push({
                sentence: 1,
                word: word,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                hasBeenHit: false
            }) 
        }
  
        randomNbr2;
        for (let i = 0; i < 2; i++) {
            randomNbr2 = Math.floor(Math.random() * sentences.length);
  
            if (randomNbr2 == randomNbr1) {
                i--
            } else {
                i++
            }
        }

        for (const word of sentences[randomNbr2].censured) {
            wordsCensuredAll.push({
                sentence: 2,
                word: word,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                hasBeenHit: false
            }) 
        }

        // console.log(wordsCensuredAll);
        
  
        marginLeftLeft = width/2-imgNews.width/2 + imgNews.width*0.1
        marginLeftTop = imgNews.height*0.35;
  
        marginRightLeft = width/2 + imgNews.width*0.08
        marginRightTop = imgNews.height*0.47
        maxWidth = marginRightLeft - marginLeftLeft - imgNews.width*0.11;
    }
  
    let {w, h} = txtDimensions(1, randomNbr1, maxWidth, marginLeftLeft, marginLeftTop)
    let {w2, h2} = txtDimensions(2, randomNbr2, maxWidth, marginRightLeft, marginRightTop)
}

function movingPencil() {
    if (goingLeft == true && (imgPencilRotate >= -150)) {
        imgPencilRotate -= 2;
    }
  
    if (goingRight == true && (imgPencilRotate <= -20)) {
        imgPencilRotate += 2;
    }
  
    imgPencil.resize(width*0.15, 0);
    
    push()
    translate(width/2, height-(imgPencil.width*0.2));
    imageMode(CENTER);
    rotate(imgPencilRotate);
    image(imgPencil, 0, 0);
    pop()
}

class Scribble {
    constructor(pos, angle, hitbox) {
        this.pos = pos;
        this.vel = p5.Vector.fromAngle(radians(angle)).mult(10);
        this.moving = true;
        this.toRemove = false;
        this.radius = hitbox; //hitboxes scribble
    }
    
    update() {
        if (this.moving) {
            this.pos.add(this.vel); // moves scribble projectile
        }
    }
    
    display() {
        if (this.toRemove) {
            fill(255, 0, 0, 0);
        } else {
            fill('#0099D6')
        }
  
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

        /* DEBUG */
        // ellipse(this.pos.x, this.pos.y+this.radius/2, 10, 10);
    }
    
    offscreen() {
        // if scribble left the screen
        return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
    }
  
    collides(element) {
        /* DEBUG */
        // ellipse(element.x, element.y+element.h/2, 10, 10);
        if (!this.toRemove) {
            let d = dist(this.pos.x, this.pos.y, element.x, element.y);

            
            //o ponto mais à direita do tiro ser maior (mais à direita) que a parte mais à esquerda da palavra
            if (this.pos.x + this.radius/2 > element.x-element.w/2 && this.pos.x - this.radius/2 < element.x + element.w/2 && //&& o ponto mais à esquerda do tiro ser menor (mais à esquerda) que a parte mais à direita da palavra
                this.pos.y + this.radius/2 > element.y-element.h/2 && this.pos.y - this.radius/2 < element.y+element.h/2 && !element.hasBeenHit) { //o ponto mais alto do tiro ser menos (mais para cima) que a parte mais baixa da palavra
            //o ponto mais baixa do tiro ser maior (mais para baixo) que a parte mais superior da palavra
                element.hasBeenHit = true;
                this.toRemove = true;
                return true;
            } else {
                return false;
            }
            
        } else {
            let d = dist(this.pos.x, this.pos.y, element.randomX, element.randomY);
            if (d <= this.radius + element.randomSize / 2 && !element.hasBeenHit) {
                element.hasBeenHit = true;
                this.moving = false;
                return true;
            } else {
                return false;
            }
        }
    }
}

function txtDimensions(sentence, sent, maxWidth, marginLeft, marginTop) {
    let words = sentences[sent].txt.split(' ');
    let line = '';
    let testLine;
    let lineHeight = textSize() * 1.2; // Line height
    let wordSpace = textSize() * 0.5;
    let textHeight = 0;
    let firstWord = true;
    let lastWordWidth;
    let lastWordHeight;
    let lastWordX;
  
    for (const word of words) {
        testLine = line + word + ' ';
    
        if (firstWord) {
            firstWord = false;
    
            text(word, marginLeft, marginTop);
    
            lastWordX = marginLeft;
            lastWordWidth = textWidth(word);
            lastWordHeight = marginTop;
    
        } else {
            if (textWidth(testLine) > maxWidth && line.length > 0) { // add a new line if width passes max width
                line = word + ' ';
    
                if (!sentences[sent].censured.includes(word)) {
                    fill('#000');
                } else {
                    fill('#0099d6');
                    // saves the coordinates
                    let wordPos = wordsCensuredAll.findIndex(item => item.sentence == sentence && item.word == word);
                    wordsCensuredAll[wordPos].x = marginLeft+textWidth(word)/2;
                    wordsCensuredAll[wordPos].y = lastWordHeight+lineHeight+lineHeight/2;
                    wordsCensuredAll[wordPos].w = textWidth(word);
                    wordsCensuredAll[wordPos].h = lineHeight;
                }
    
                text(word, marginLeft, lastWordHeight+lineHeight) // marginTop + lineHeight = new line
    
                lastWordX = marginLeft;
                lastWordWidth = textWidth(word);
                lastWordHeight = lastWordHeight+lineHeight;
    
            } else {
                if (!sentences[sent].censured.includes(word)) {
                    fill('#000');
                } else {
                    fill('#0099d6');
                    let wordPos = wordsCensuredAll.findIndex(item => item.sentence == sentence && item.word == word);
                    wordsCensuredAll[wordPos].x = lastWordX+lastWordWidth+wordSpace+textWidth(word)/2;
                    wordsCensuredAll[wordPos].y = lastWordHeight+lineHeight/2;
                    wordsCensuredAll[wordPos].w = textWidth(word);
                    wordsCensuredAll[wordPos].h = lineHeight;
                }
    
                line = testLine;
                text(word, lastWordX+lastWordWidth+wordSpace, lastWordHeight);
    
                lastWordX = lastWordX+lastWordWidth+wordSpace;
                lastWordWidth = textWidth(word);
            }
        }
  
        // "for" to verify if the censuredWord was already hit by player
        for (const censuredWord of wordsCensuredAll) {
            if (censuredWord.sentence == sentence && censuredWord.word == word && censuredWord.hasBeenHit) {
                fill('#0099d6');
                rect(censuredWord.x, censuredWord.y, censuredWord.w, censuredWord.h);
                // console.log(censuredWord);
            }
        }
    }
  
    return { w: maxWidth, h: textHeight };
}

function projectileCollidesElement(elements) {
    for (let i = 0; i < scribbles.length; i++) {
        let scribble = scribbles[i];
    
        for (const element of elements) {
            if (scribble.collides(element)) {
                points += 5;
                
                scribbles.splice(i, 1);
            }
        }
    }
}

function livesDisplay() {
    for (let i = 1; i <= lives; i++) {
        image(heart,
            width-heartW*i - heartW*0.1*i, heartW,
            heartW, (heart.height*heartW)/heart.width)
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
            fadeTxtStart += 2;
        } else {
            fadeTxtStart -= 2;
        }
        fill(255, 255, 255, fadeTxtStart)
    } else {
        fill(255, 255, 255, 255)
    }

    textFont(font, size);
    stroke(0, 0, 0, fadeTxtStart);
    strokeWeight(3);
    textAlign(CENTER, CENTER)
    text(sentence, posX, posY);
}

function gameEnded(lost) {
    // if (frameCount % 50 == 0) {
        
    // }
    if (fadeIn != 180) {
        fadeIn += 3;
    }

    fill(0, 0, 0, fadeIn)
    rect(width/2, height/2,
        width, height)

    if (fadeIn >= 180) {
        if (lost) {
            txtDisplay("Fizeste "+points+" pontos.", width/2, height/2*0.9, 32, false)

            fill("#C0392B");
            textFont(font, 44);
            stroke(0, 0, 0, 255);
            strokeWeight(3);
            textAlign(CENTER, CENTER)
            text("GAMEOVER", width/2, height/2);

            txtDisplay("Clica para recomeçar.", (width/2), height/2*1.1, 32, true)
        } else {
            txtDisplay("Fizeste "+points+" pontos.", (width/2), height/2*0.9, 32, false)
            txtDisplay("Clica para continuar.", (width/2), height/2, 32, true)
        }
    }
}   

export function censorShip_mouseClicked() {
if (mouseX > 0 && mouseX < width 
    && mouseY > 0 && mouseY < height
    && gameOver) {

        if (won) {
            scribbles = [];
            wordsCensuredAll = []
            gameOver = false
            won = false;
            isScenarioCreated = false;
        } else {
            points = 0;
            lives = 7;
            scribbles = [];
            wordsCensuredAll = []
            gameOver = false
            won = false;
            isScenarioCreated = false;
        }
    }
}