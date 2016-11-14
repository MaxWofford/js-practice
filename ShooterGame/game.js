var game = new Phaser.Game(1200, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
}

var sky, platforms, ground, ledge;
var player, enemy;
var bulletKey;
var cursors;
var muOne, muTwo;
var star;

function create() 
{
	//Music
	muOne = game.add.audio('animalCrossingMP3');
	muTwo = game.add.audio('tobyFoxMP3');
	
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
	ledge = platforms.create(800, 500, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-200, 550, 'ground');
	ledge.body.immovable = true;
	
	//Player Sprites
	player = game.add.sprite(600, 450, 'dude');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;
	player.body.bounce.x = 0.4;
	//PlayerAnimations
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	//Enemy Sprites
	enemy = game.add.sprite(100, 100, 'baddie');
	game.physics.arcade.enable(enemy);
	enemy.body.bounce.y = 0.2;
	enemy.body.gravity.y = 800;
	enemy.body.bounce.x = 0.4;
	
	//Collision with world
	player.body.collideWorldBounds = true;
	enemy.body.collideWorldBounds = true;
	
	//Player controls
	cursors = game.input.keyboard.createCursorKeys();
	bulletKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() 
{
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(enemy, platforms);
	game.physics.arcade.collide(player,enemy);
	
	//Player movement
	player.body.velocity.x = 0;
	if (cursors.left.isDown)
	{
		player.body.velocity.x = -150;
		player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 150;
		player.animations.play('right');
	}
	else
	{
		player.animations.stop(0);
		player.frame = 4;
	}
	//Jump and double jump
	if(cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -450;
	}
	
	//Shoots bullets
	if(bulletKey.isDown)
	{
		muOne.play();
	}
	
	//muOne.play();
}
