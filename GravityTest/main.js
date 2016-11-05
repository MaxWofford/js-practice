//Testing out how gravity would work in simulation

var GRAVITY = 9.8;
var dimensions = 20;
var x = 300;
var y = 200;
var velocityY = 30;
var velocityX = 0;

function setup()
{
    createCanvas(1000, 1000);
    frameRate(30);
}

function draw()
{
    background(52, 152, 219);
    
    //Ground
    fill(39, 174, 96);
    rect(0, 900, width, height)
    
    //Projectile
    fill(255, 255 ,255);
    ellipse(x, y, dimensions, dimensions);
    
    //Y movement
    y -= velocityY;
    velocityY -= GRAVITY;
    
    //X movement
    x -= velocityX;
    
    //Y bounce
    if (y > (900 - dimensions) || y === (900 - dimensions))
    {
        velocityY = -velocityY - 25;
        y = 899 - (dimensions / 2);
    }
}