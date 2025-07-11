/** GAME VARIABLES */
let font;
let points = 0, resetPoints = false;
let sentence = "Pressiona espaço para começar.", fadeTxtStart = 255, fadeTxtStartSwitch = false;
let gameStarted = false, gamePaused = false;
let isScenario2Created = false;
let counter = 0;
let randomNbr = 0;
let randomNbrs = [];
let goingLeft = false;
let goingRight = false;

/** IMAGES */
let imgBrickEmpty, imgBrickComunismo, imgBrickDitadura, imgBrickExilio, imgBrickOpressao, imgBrickPIDE, imgBrickTop, imgBrickFloor, imgSlingshot, imgRock, imgBgLvl2;
let bricksImgs = [];

/** SLINGSHOT */
let slingshotX, slingshotSpeed = 8;
let balls = [];
let isBallOut = false;
let ballSpeed = 7;

//* CHOOSE CONTROLS */
let gameControlsChosen = false;
let controls;
let controlsPosX, controlsW;
let keyboardImg, handsImg;
let handX;
//* ML5 */
let video;
let handPose;
let hands = [];
let ml5Setup = true;

export function bricks_preload() {
    handPose = ml5.handPose({ flipped: true }); //this would be in preload if only the option to control by hand camera movement existed, and the rest in setup

    keyboardImg = loadImage('../images/website/iconography/keyboard.png');
    handsImg = loadImage('../images/website/iconography/hand.png');

    font = loadFont('.././fonts/Jersey_10/Jersey10-Regular.ttf');

    imgBrickEmpty = loadImage('../images/games/elements/brick_opacity.png');
    imgBrickComunismo = loadImage('../images/games/elements/brick_comunismo.png');
    imgBrickDitadura = loadImage('../images/games/elements/brick_ditadura.png');
    imgBrickExilio = loadImage('../images/games/elements/brick_exilio.png');
    imgBrickOpressao = loadImage('../images/games/elements/brick_opressao.png');
    imgBrickPIDE = loadImage('../images/games/elements/brick_PIDE.png');
    imgBrickTop = loadImage('../images/games/elements/brick_topo.png');
    imgBrickFloor = loadImage('../images/games/scenery/brick_floor.png');
    imgSlingshot = loadImage('../images/games/elements/slingshot.png');
    imgRock = loadImage('../images/games/elements/rock.png');
    
    imgBgLvl2 = loadImage('../images/games/scenery/bg_blue_houses.png');
};

export function bricks_setup() {
    controlsW = height/3;
    controlsPosX = width*0.3;
    
    slingshotX = width/2;

    bricksImgs = [{
            img: imgBrickComunismo,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
            hasBeenHit: false
        },
        {
            img: imgBrickDitadura,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
            hasBeenHit: false
        },
        {
            img: imgBrickExilio,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
            hasBeenHit: false
        },
        {
            img: imgBrickOpressao,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
            hasBeenHit: false
        },
        {
            img: imgBrickPIDE,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
            hasBeenHit: false
        },
    ];

    // balls.push(new Ball(width/2, height*0.8, width*0.015));
}

export function bricks_draw() {
    image(imgBgLvl2, 
        width/2, height/2,
        width, height
    );

    if (!gameControlsChosen) {
        gameControls();
    } else {
        //* ML5 */
        if (controls == "hands") {
            if (ml5Setup) {
                video = createCapture(VIDEO, { flipped : true });
                video.size(width*1.1, height*1.1);
                // video.position(width/2, height/2)
                video.hide();

                //starts detecting hands
                handPose.detectStart(video, gotHands);

                ml5Setup = false;
            }

            drawHands();
        }

        let brickDestroyed = (currentValue) => currentValue.hasBeenHit == true;

        if (!bricksImgs.every(brickDestroyed)) {
            bricks();
        } else {
            //* GAMEOVER (succeeded) */
            
            balls[0].bPos = createVector(width/2, height*0.8); // restarts positioning of the rock
            balls[0].bAngle = createVector(0, -10); // restarts vector direction of the rock
            slingshotX = width/2 // restarts positiniong of the slingshot
            
            gameStarted = false;
            isBallOut = false;

            isScenario2Created = false;
            randomNbrs = [];
            bricksImgs = [{
                    img: imgBrickComunismo,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickDitadura,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickExilio,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickOpressao,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickPIDE,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
            ];
            
            resetPoints = false;
            sentence = "Pressione espaço para continuar!"
            txtDisplay(sentence, width*0.5, height*0.5, 32, true);
        }

        /** Draw ball */
        if (!isBallOut) {
            for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            ball.render();
            }
        } else {
            for (let i = 0; i < balls.length; i++) {
                let ball = balls[i];
                ball.draw();
            }
    
            ballCollidesElement(bricksImgs);
    
            for (let i = 0; i < balls.length; i++) {
                let ball = balls[i];

                ball.afterBorder();
            }
        }

        movingSlingshot();

        /** text showing points */
        txtDisplay(points, width*0.5, height*0.05, 32, false);
        
        if (!gameStarted) { /** text saying to click space to start/restart */
            txtDisplay(sentence, width*0.5, height*0.5, 32, true);
        }

        //* PAUSES GAME */
        pauseGame();
    }
}

function movingSlingshot() {
    if (isBallOut && goingLeft == true && (slingshotX - imgSlingshot.width/2) >= 0) {
        slingshotX -= slingshotSpeed;
    }
  
    if (isBallOut && goingRight == true && (slingshotX + imgSlingshot.width/2) <= width) {
        slingshotX += slingshotSpeed;
    }
  
    imgSlingshot.resize(0, height*0.15);
    image(imgSlingshot,
        slingshotX, height-imgSlingshot.height*0.6)
        // (imgSlingshot.width*(height*0.15))/imgSlingshot.height, height*0.15);
    ballMovingSlingshotColision(slingshotX, imgSlingshot.width, imgSlingshot.height);
}

function ballMovingSlingshotColision(rectangleX, rectangleW, rectangleH) {
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        
        if (ball.bPos.x > rectangleX - rectangleW / 2 && ball.bPos.x < rectangleX + rectangleW / 2 && ball.bPos.y + ball.bR > (height*0.9) - rectangleH / 2 && ball.bPos.y < height*0.9) {
            let newAngleX = map(ball.bPos.x, rectangleX - rectangleW / 2, rectangleX + rectangleW / 2, -1, 1);
            ball.bAngle.set(newAngleX * ball.bSpeed, -ball.bSpeed);
        }
    }
}

function ballCollidesElement(elements) {
    /** Detects collision between ball and rectangles */
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        for (const element of elements) {
            if (ball.collides(element)) {
                ball.afterRectangle();
            }
        }
    }
}

function pauseGame() {
    if (gamePaused) {
        txtDisplay("Jogo em pausa", width/2, height/2, 32, false);
        noLoop();
    }
}

export function bricks_keyPressed() {
    if (key === ' ') {
        gameStarted = true;
        isBallOut = true;

        if (resetPoints) {
            points = 0;
        }
    }

    //* PAUSES THE GAME */
    if (keyCode === 27) {
        gamePaused = !gamePaused;
        
        if (!gamePaused) {
            loop();
        }
    }
    
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

export function bricks_keyReleased() {
    if (keyCode === LEFT_ARROW) {
        goingLeft = false;
    }
    
    if (keyCode === RIGHT_ARROW) {
        goingRight = false;
    }
}

export function bricks_mouseClicked() {
    if (!gameControlsChosen &&
        (mouseX > controlsPosX-controlsW/2 && mouseX < controlsPosX+controlsW/2) &&
        (mouseY > (height/2-controlsW/2) && mouseY < (height/2+controlsW/2))) {
        controls = "keyboard";
        gameControlsChosen = true;
        balls.push(new Ball(width/2, height*0.8, width*0.015));
    }

    //* mouse clicked on "mãos"(hands) control option */
    else if (!gameControlsChosen &&
        (mouseX > (width-controlsPosX)-controlsW/2 && mouseX < (width-controlsPosX)+controlsW/2) &&
        (mouseY > (height/2-controlsW/2) && mouseY < (height/2+controlsW/2))) {
        controls = "hands";
        gameControlsChosen = true;
        ballSpeed = 5;
        balls.push(new Ball(width/2, height*0.8, width*0.015));
    }
}

function bricks() {
    imgBrickEmpty.resize(width*0.1, 0);
    imgBrickTop.resize(width*0.1, 0);
    imgBrickFloor.resize(width*0.1, 0);
    imgBrickComunismo.resize(width*0.1, 0);
    imgBrickDitadura.resize(width*0.1, 0);
    imgBrickExilio.resize(width*0.1, 0);
    imgBrickOpressao.resize(width*0.1, 0);
    imgBrickPIDE.resize(width*0.1, 0);
  
    let BH = imgBrickEmpty.height; //brick's height
    let BW = imgBrickEmpty.width; //brick's width
    let BWI = width-BW/2; //brick left position in the canvas
    let BHI = height-BH/2; //brick bottom position in the canvas
  
    let rowsOfBrick = Math.ceil(height / BH) - 5;
    let columnsOfBrick = Math.floor(width / BW);
  
    if (!isScenario2Created) {    
        isScenario2Created = true;
    
        counter = (rowsOfBrick-3) * columnsOfBrick;
    
        for (let i = 0; i < 5; i++) {
            randomNbr = Math.floor(Math.random() * counter) + 1;
        
            if (!randomNbrs.includes(randomNbr)) {
                randomNbrs.push(randomNbr); 
            } else {
                i--
            }
        }   
    }
    
    let counter2 = 0;
    for (let i = 0; i < rowsOfBrick; i++) {
        for (let j = 0; j < columnsOfBrick; j++) {
            counter2++

            if (i == 0 || i == 1) {
                counter2--
                image(imgBrickFloor, BWI-(BW*j), BHI-(BH*i))
                    // width*0.1, (imgBrickFloor.height*(width*0.1))/imgBrickFloor.width);
            } else if (randomNbrs.includes(counter2)) {
                if (!bricksImgs[randomNbrs.indexOf(counter2)].hasBeenHit) {
                    image(bricksImgs[randomNbrs.indexOf(counter2)].img,
                        BWI-(BW*j), BHI-(BH*i))
                        // width*0.1, (bricksImgs[randomNbrs.indexOf(counter2)].img.height*(width*0.1))/bricksImgs[randomNbrs.indexOf(counter2)].img.width); 

                    bricksImgs[randomNbrs.indexOf(counter2)].w = BW;
                    bricksImgs[randomNbrs.indexOf(counter2)].h = BH;
                    bricksImgs[randomNbrs.indexOf(counter2)].x = BWI-(BW*j)-BW/2;
                    bricksImgs[randomNbrs.indexOf(counter2)].y = BHI-(BH*i)-BH/2;
                }
            } else if (i == rowsOfBrick-1) {
                image(imgBrickTop, BWI-(BW*j), BHI-(BH*i))
                    // width*0.1, (imgBrickTop.height*(width*0.1))/imgBrickTop.width);
            } else {
                // tint(200,200,200,180);
                image(imgBrickEmpty, BWI-(BW*j), BHI-(BH*i))
                    // width*0.1, (imgBrickEmpty.height*(width*0.1))/imgBrickEmpty.width);
                // noTint();
            }
        }  
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
            fadeTxtStart += 1.5;
        } else {
            fadeTxtStart -= 1.5;
        }
    } else {
        fadeTxtStart = 255;
    }

    textFont(font, size);
    fill(255, 255, 255, fadeTxtStart)
    stroke(0, 0, 0, fadeTxtStart);
    strokeWeight(3);
    textAlign(CENTER, CENTER)
    text(sentence, posX, posY);
}

class Ball {
    constructor(x, y, w) {
        this.bPos = createVector(x, y);
        this.bSpeed = ballSpeed;
        this.bAngle = createVector(this.bSpeed, -this.bSpeed);
        this.bR = w;
    }
  
    render() {
        imgRock.resize(this.bR, 0);
        image(imgRock, this.bPos.x, this.bPos.y)
            // this.bR, (imgRock.height*this.bR)/imgRock.width);
    }
  
    draw() {
        imgRock.resize(this.bR, 0);
        this.bPos.add(this.bAngle);
        image(imgRock, this.bPos.x, this.bPos.y)
            // this.bR, (imgRock.height*this.bR)/imgRock.width);

        /* DEBUG */
        // fill("#C02")
        // circle(this.bPos.x - this.bR/2, this.bPos.y + this.bR/2, 10)
    }
  
    collides(element) {
        /* DEBUG */
        // fill("#C02")
        // circle(element.x, element.y, 10)

           // mais à direita           mais à esquerda
        if (this.bPos.x + this.bR/2 >= element.x
                //NOT to the left
                &&
                this.bPos.x - this.bR/2 <= element.x + element.w
                //NOT to the right
                &&
                this.bPos.y + this.bR/2 >= element.y
                //NOT above
                &&
                this.bPos.y - this.bR/2 <= element.y + element.h
                //NOT below
                &&
                element.hasBeenHit == false) {
            /* they collide! */
            element.hasBeenHit = true;
            return true;
        }
    }
  
    afterRectangle() {
        points += 5;

        // this.bAngle.x *= -1;
        this.bAngle.y *= -1;
        this.draw();
    }
  
    afterBorder() {
        if (this.bPos.x + this.bR/2 >= width) {
            this.bPos.x = width-this.bR;
            this.bAngle.x *= -1;
        } else if (this.bPos.x - this.bR/2 <= 0) {
            this.bPos.x = this.bR;
            this.bAngle.x *= -1;
        } else if (this.bPos.y - this.bR/2 <= 0) {
            this.bPos.y = this.bR;
            this.bAngle.y *= -1;
        }
        
        if (this.bPos.y + this.bR/2 > height*0.95) {
            //* GAMEOVER (failed) */
            this.bPos = createVector(width/2, height*0.8); // restarts positioning of the rock
            this.bAngle = createVector(0, -this.bSpeed); // restarts vector direction of the rock
            slingshotX = width/2 // restarts positiniong of the slingshot
            
            gameStarted = false;
            isBallOut = false;

            isScenario2Created = false;
            randomNbrs = [];
            bricksImgs = [{
                    img: imgBrickComunismo,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickDitadura,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickExilio,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickOpressao,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
                {
                    img: imgBrickPIDE,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0,
                    hasBeenHit: false
                },
            ];
            
            resetPoints = true;
            sentence = "Pressione espaço para recomeçar!"
            txtDisplay(sentence, width*0.5, height*0.5, 32, true);
        }
    }
}

//* TO CHOOSE GAME CONTROLS */
function gameControls() {
    textFont(font, 20);
    textAlign(CENTER, CENTER);

    fill(253, 235, 208);
    strokeWeight(4);
    stroke("#C0392B");

    square(controlsPosX-controlsW/2, height/2-controlsW/2, controlsW);
    square(width-controlsPosX-controlsW/2, height/2-controlsW/2, controlsW);

    noStroke();
    fill("#000")
    text("Teclado", controlsPosX, height/2+controlsW*0.4);
    image(keyboardImg,
        controlsPosX, height/2,
        controlsW*0.6, ((controlsW*0.6)*keyboardImg.height)/keyboardImg.width);
    text("Controlo com mãos", width-controlsPosX, height/2+controlsW*0.4);
    image(handsImg,
        width-controlsPosX, height/2,
        controlsW*0.3, ((controlsW*0.3)*handsImg.height)/handsImg.width);
}

function gotHands(results) {
    hands = results;
}

function drawHands() {
    if (hands.length > 0) {
        let hand = hands[0];

        if (hand.confidence > 0.1) {
            let averageX = 0;
            // Loop through keypoints and draw circles
            for (let i = 0; i < hand.keypoints.length; i++) {
                let keypoint = hand.keypoints[i];
                averageX += keypoint.x;

                if (i == hand.keypoints.length-1) {
                    averageX = averageX / hand.keypoints.length;
                }

                slingshotX = averageX;
            }
        }
    }
}