let imgBgLvl1, imgNews, imgPencil;
let imgPencilRotate = -90;
let goingLeft = false, goingRight = false;

let isScenarioCreated;

let scribbles = [];
let fontPX;

let sentences = [{
    txt: "O governo enfrenta críticas crescentes devido à sua política de medidas rigorosas contra a contestação.",
    censured: ["medidas", "rigorosas"]
  },
  {
    txt: "Os indivíduos exigem mais espaço para expressão e o fim da regulação estatal.",
    censured: ["indivíduos", "mais", "espaço", "para", "expressão", "regulação"]
  },
  {
    txt: "A autoridade policial deteve vários militantes que protestavam pacificamente contra o regime.",
    censured: ["autoridade", "policial", "militantes"]
  },
  {
    txt: "O líder da parte contrária denunciou publicamente questões controversas cometidas pelo Estado.",
    censured: ["parte", "contrária", "questões", "controversas"]
  },
  {
    txt: "Os pensadores organizam-se secretamente para expressar suas opiniões do regime.",
    censured: ["pensadores", "expressar", "suas", "opiniões"]
  },
];

let wordsCensuredAll = [];

let randomNbr1, randomNbr2;
let marginLeftLeft, marginLeftTop, marginRightLeft, marginRightTop, maxWidth;

export function game1_preload() {
    //* font */
    fontPX = loadFont('.././fonts/VT323/VT323-Regular.ttf');

    imgBgLvl1 = loadImage('../images/games/pixelart/cs1-3_blurry.png');
    imgNews = loadImage('.././images/games/pixelart/jornal.png');
    imgPencil = loadImage('.././images/games/pixelart/lapis_azul.png');
};

export function game1_setup() {
    
}

export function game1_draw() {
    clear();

    noStroke();
    imgBgLvl1.resize(width, 0);
    image(imgBgLvl1, width-imgBgLvl1.width/2, height-(imgBgLvl1.height/2));
    imgNews.resize(0, height);
    image(imgNews, width/2, height-(imgNews.height/2));

    for (let i = scribbles.length - 1; i >= 0; i--) {
        scribbles[i].update();
        scribbles[i].display();

        if (scribbles[i].offscreen()) {
            scribbles.splice(i, 1);
        }
    }

    let allWordsCensured = (currentValue) => currentValue.hasBeenHit == true;
  
    //* if not every word has been censored yet */
    if (wordsCensuredAll.length == 0 || !wordsCensuredAll.every(allWordsCensured)) {
        newspaper();
    } else {  //* else */
        isGameOver = true;
    }

    projectileCollidesElement(wordsCensuredAll);
    
    movingPencil();
}

export function game1_keyPressed() {
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

export function game1_keyReleased() {
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
        imgPencilRotate -= 5;
    }
  
    if (goingRight == true && (imgPencilRotate <= -20)) {
        imgPencilRotate += 5;
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
    }
    
    offscreen() {
        // if scribble left the screen
        return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
    }
  
    collides(element) {
        if (!this.toRemove) {
            let d = dist(this.pos.x, this.pos.y, element.x, element.y);
    
            if (this.pos.x + this.radius > element.x && this.pos.x - this.radius < element.x + element.w &&
                this.pos.y + this.radius > element.y && this.pos.y - this.radius < element.y + element.h && !element.hasBeenHit) {
    
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
                console.log(censuredWord);
                
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
            // ball.afterRectangle();
            scribble.update()
            }
        }
    }
}