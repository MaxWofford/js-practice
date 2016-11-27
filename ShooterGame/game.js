var width = 1200, height = 900; 

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() 
{
	//Load Assets
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('firstaid', 'assets/firstaid.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	game.load.audio('animalCrossingMP3', 'assets/animalCrossing.mp3');
	game.load.audio('tobyFoxMP3', 'assets/dogBass.mp3');
	game.load.audio('diddyKongMP3', 'assets/diddyKong.mp3');
}
var gravity = 650; //World Properties
var score = 0; //Score keeping ***
var sky, platforms, ground, ledge; //BG
var player, enemyNum = 4; //Characters
var arrowKeys, spaceKey; //Keyboard
var muOne, muTwo, muThree; //Music
var bulletSpeed = 600; //Projectiles
var nextFire = 0, fireRate = 400; //Gun


var bulletArr = new Array();
var enemyArr = new Array();

function create() 
{
	//Music
	muOne = game.add.audio('animalCrossingMP3');
	muTwo = game.add.audio('tobyFoxMP3');
	muThree = game.add.audio('diddyKongMP3');
	//muThree.play();
	
	//Arcade Physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//Sky
	sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(1.5, 1.5);
	//Platforms (includes ground and ledges)
	platforms = game.add.group();
	platforms.enableBody = true;
	//Ground
	ground = platforms.create(0, game.world.height - 60, 'ground');
	ground.scale.setTo(3, 2);
	ground.body.immovable = true;
	//Ledges
	ledge = platforms.create(300, 700, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(1000, 700, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-200, 600, 'ground');
	ledge.body.immovable = true;
	
	//Player Sprites
	player = game.add.sprite(width/2, height/2, 'dude');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = gravity;
	player.body.bounce.x = 0.4;
	player.body.collideWorldBounds = true;
	//PlayerAnimations
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.direction = 0;
	
	//Enemy Sprites
	for (var i = 0; i < enemyNum; i++)
	{
		do //Find random number between screen (that isnt close to player) and set it as x for enemy
		{
			var randomX = Math.random() * (width - 100) + 100;
		} 
		while ((randomX > (width/2 - 100)) && (randomX < (width/2 + 100)));
			
		var enemy = game.add.sprite(randomX, 100, 'baddie');
		game.physics.arcade.enable(enemy);
		enemy.body.bounce.y = 0.2;
		enemy.body.gravity.y = gravity;
		enemy.body.bounce.x = 0.4;
		enemy.body.collideWorldBounds = true;
		enemyArr[i] = enemy;
		enemyArr[i].direction = Math.round(Math.random());
		debug(enemyArr[i].direction);
	}
	
	//Player controls
	arrowKeys = game.input.keyboard.createCursorKeys();
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() 
{
	//Collision
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(platforms, enemyArr);
	game.physics.arcade.collide(player,enemyArr);
	
	//Player movement
	player.body.velocity.x = 0;
	if (arrowKeys.left.isDown)
	{
		player.body.velocity.x = -150;
		player.animations.play('left');
		player.direction = 0;
	}
	else if (arrowKeys.right.isDown)
	{
		player.body.velocity.x = 150;
		player.animations.play('right');
		player.direction = 1;
	}
	else //When player stops moving, sets the sprite pic
	{
		player.animations.stop(0);
		if (player.direction ===  0)
		{
			player.frame = 0;
		}
		else 
		{
			player.frame = 5;
		}
	}
	
	//Jump and double jump
	if(arrowKeys.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -450;
	}
	
	//NOT WORKING *** 
	// var rect = new Phaser.Rectangle(0, 0, 200, 50);
	// game.debug.geom(rect, '#0fffff');
	// game.add.text(0, 0, "Score: " + score, {fill: "#ff0000"}); 
	
	shootBullet();
	bulletEnemyCollision();
	enemyMovement();
}

function enemyMovement() //Artificial intelligence omg
{
	for (var i = 0; i < enemyNum; i++)
	{
		if(enemyArr[i].direction === 0)
		{
			enemyArr[i].body.velocity.x = -50;
			if((Math.round(Math.random() + 0.49)) === 0)
			{
				enemyArr[i].direction = 1;
			}
		}
		else if (enemyArr[i].direction === 1)
		{
			enemyArr[i].body.velocity.x = 50;
			if((Math.round(Math.random() + 0.49)) === 0)
			{
				enemyArr[i].direction = 0;
			}
		}
	}
}

function shootBullet()
{
	if(game.time.now > nextFire)
	{
		if(spaceKey.isDown)
		{
			var bullets = game.add.sprite(player.x, player.y, 'star');
			game.physics.arcade.enable(bullets);
			
			bulletArr[bulletArr.length] = bullets;
			
			if (player.direction === 1)
			{
				bullets.body.velocity.x = bulletSpeed;
			}
			else if (player.direction === 0)
			{
				bullets.body.velocity.x = -bulletSpeed;
			}
			nextFire = game.time.now + fireRate;
		}
	}
}

function bulletEnemyCollision()
{
	for (var enemyIndex = 0; enemyIndex < enemyArr.length; enemyIndex++)
	{
		for (var bulletIndex = 0; bulletIndex < bulletArr.length; bulletIndex++)
		{
			if(game.physics.arcade.collide(enemyArr[enemyIndex], bulletArr[bulletIndex]))
			{
				death(enemyArr[enemyIndex]);
				bulletArr[bulletIndex].destroy();
			}
		}
	}
}

function death(sprite)
{
	//Fades the sprite
	game.add.tween(sprite).to( { alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
	//If the sprite is faded, then destroy it
	if(sprite.alpha === 0)
	{
		sprite.destroy();
		score++; //Increases score ***
	}
}

function debug(x)
{
	console.log("Debug: " + x);
}