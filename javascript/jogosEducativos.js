let barW, barH, ball, ballMove;

function setup() {
    barW = document.querySelector('#timelineBarP5').offsetWidth;
    barH = document.querySelector('#timelineBarP5').offsetHeight;

    ball = {
        x: barW*0.1,
        y: barH/2,
        size: barH
    }

    ballMove = false;
    
    console.log(barW +' '+ barH);

    let timelineCanvas = createCanvas(barW, barH);
    timelineCanvas.parent("timelineBarP5")
}
  
function draw() {
    let beige = "#FDEBD0";
    let red = "#C0392B";

    clear();
    noStroke();

    //* entire rectangle of timeline bar */
    fill(beige);
    rect(0, barH/2-barH/4, barW, barH/2); /* (x, h, width, height) */

    //* red ball */
    fill(red);
    circle(ball.x, ball.y, ball.size); /* (x, y, diameter) */

    //* red part of the timeline bar that precedes the red ball */
    fill(red);
    rect(0, barH/2-barH/4, ball.x, barH/2);
}

function mousePressed() {
    let distance = mouseX - ball.x

    console.log(mouseX +' '+ ball.x+' '+ball.size+' '+distance);
    

    if (distance < ball.size/2) {
        ballMove = true;
        console.log('yes');
        
    } else {
        ballMove = false;
    }
}

function mouseDragged() {
    if (ballMove) {
        ball.x = mouseX;
    }
}

function mouseRelease() {
    ballMove = false;
}