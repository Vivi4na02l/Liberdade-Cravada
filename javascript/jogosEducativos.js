function setup() {
    let barW = document.querySelector('#timelineBarP5').offsetWidth;
    let barH = document.querySelector('#timelineBarP5').offsetHeight;

    console.log(barW +' '+ barH);

    let timelineCanvas = createCanvas(barW, barH);
    timelineCanvas.parent("timelineBarP5")
}
  
function draw() {
    let barW = document.querySelector('#timelineBarP5').offsetWidth;
    let barH = document.querySelector('#timelineBarP5').offsetHeight;

    let beige = "#FDEBD0";
    let red = "#C0392B";

    // clear();
    noStroke();

    //* entire rectangle of timeline bar */
    fill(beige);
    rect(0, barH/2-barH/4, barW, barH/2); /* (x, h, width, height) */

    //* red ball */
    fill(red);
    circle(barW*0.1, barH/2, barH); /* (x, y, diameter) */

    //* red part of the timeline bar that precedes the red ball */
    fill(red);
    // rect(0, barH/2-barH/4, );
}

function mousePressed() {
    fill(red);
    circle(mouseX, barH/2, barH);
}
  