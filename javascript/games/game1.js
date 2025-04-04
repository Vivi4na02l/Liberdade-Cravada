export let imgBgLvl1, imgNews, imgPencil;
export let imgPencilRotate = -90;
let goingLeft = false, goingRight = false;

let flowers = [];
let fontPX;

export let sentences = [{
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

export let wordsCensuredAll = [];

export let randomNbr1, randomNbr2;
export let marginLeftLeft, marginLeftTop, marginRightLeft, marginRightTop, maxWidth;

export function game1_preload() {
    //* font */
    fontPX = loadFont('../../fonts/Jersey_10/Jersey10-Regular.ttf');

    imgBgLvl1 = loadImage('../../images/games/pixelart/cs1-3_blurry.png');
    imgNews = loadImage('../../images/games/pixelart/jornal.png');
    imgPencil = loadImage('../../images/games/pixelart/lapis_azul.png');
};

export function game1_setup() {
    
}

export function game1_draw() {
    clear();

    imgBgLvl1.resize(width, 0);
    image(imgBgLvl1, width-imgBgLvl1.width/2, height-(imgBgLvl1.height/2));
    imgNews.resize(0, height);
    image(imgNews, width/2, height-(imgNews.height/2));

    for (let i = flowers.length - 1; i >= 0; i--) {
        flowers[i].update();
        flowers[i].display();

        if (flowers[i].offscreen()) {
            flowers.splice(i, 1);
        }
    }

    let allWordsCensured = (currentValue) => currentValue.hasBeenHit == true;
  
    if (wordsCensuredAll.length == 0 || !wordsCensuredAll.every(allWordsCensured)) {
        newspaper();
    }

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

    if (key === ' ') { //isFlowerOut
        fill('#0099D6')
        flowers.push(new Flower(createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2));
    }
}

function newspaper() {
    fill('#000');
    textFont(fontPX, 25);
    textAlign(LEFT, TOP);
  
    // if (!isScenario1Created) {
    //   isScenario1Created = true;
  
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
    // }
  
    // let {w, h} = txtDimensions(1, randomNbr1, maxWidth, marginLeftLeft, marginLeftTop)
    // let {w2, h2} = txtDimensions(2, randomNbr2, maxWidth, marginRightLeft, marginRightTop)
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

class Flower {
    constructor(pos, angle, hitbox) {
        this.pos = pos;
        this.vel = p5.Vector.fromAngle(radians(angle)).mult(10);
        this.moving = true;
        this.toRemove = false;
        this.radius = hitbox; //hitboxes flower
    }
    
    update() {
        if (this.moving) {
            this.pos.add(this.vel); // moves flower projectile
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
        // if flower left the screen
        return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
    }
  
    collides(element) {
        if (gameLevel == 1 && !this.toRemove) {
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