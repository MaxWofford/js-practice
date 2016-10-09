//Testing out how gravity would work in simulation

var GRAVITY = 9.8;
var dimensions = 10;
var x = 300;
var y = 200;
var velocity = 30;

function setup()
{
    createCanvas(500, 1000);
    frameRate(15);
}

function draw()
{
    background(255, 255, 255);
    fill(color(120, 120, 120));
    ellipse(x, y, dimensions, dimensions);
    y -= velocity;
    velocity -= GRAVITY;
    
    if (y > 900 || y === 900)
    {
        velocity = -velocity - 25;
        y = 899;
    }
}