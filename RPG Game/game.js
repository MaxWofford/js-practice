//Game will be semi-RPG where you can level up, walk around, battle. Kind of like pokemon

//Global varibles
var player;
var playerImage;
var enemy;
var enemyImage;

//Flag for battle
var battle = false;

//Speed of player
var speed = 4;

function preload()
{
    playerImage = loadImage("Soldier.png");
    enemyImage =  loadImage("Soldier2.png");
}

function setup()
{
    createCanvas(1000, 800);
    background(52, 152, 219);
    
    //Creates player with playerimage
    player = createSprite(width/2, height/2, playerImage.width, playerImage.height);
    player.addImage(playerImage);
    
    //Create enemy
    enemy = createSprite(200, 100, enemyImage.width, enemyImage.height);
    enemy.addImage(enemyImage);
}

function draw()
{
    //For battle scenes
    if (battle)
    {
        //White background
        background(255, 255, 255);
        
        //Draw two circles as ground
        fill(39, 174, 96);
        ellipse(player.position.x, player.position.y + playerImage.width/2 , playerImage.width * 2, playerImage.height / 4);
        ellipse(enemy.position.x, enemy.position.y + enemyImage.width/2 , enemyImage.width * 2, enemyImage.height / 4);
        
        //Draw SPrites
        drawSprites();
        
        //Change player position
        player.position.x = width / 4;
        player.position.y = height / 2;
        enemy.position.x = 3 * width / 4;
        enemy.position.y = height / 2;
        
        //Rectangle for choice scene
        strokeWeight(5);
        fill(255, 255, 255);
        rect(0, height * 3 / 4, width - 1, height / 4 - 1);

    }
    //Regular movement scene
    else
    {
        //Redraw background
        background(52, 152, 219);
        
        //Draw sprites
        drawSprites();
        
        //Player movement
        if(keyDown(UP_ARROW))
        {
            player.position.y -= speed;
        }
        if(keyDown(DOWN_ARROW))
        {
            player.position.y += speed;
        }
        if(keyDown(LEFT_ARROW))
        {
            player.position.x -= speed;
        }
        if(keyDown(RIGHT_ARROW))
        {
            player.position.x += speed;
        }
        
        //Battle scene if overlap
        if (enemy.overlap(player))
        {
            battle = true;
        }
    }
}