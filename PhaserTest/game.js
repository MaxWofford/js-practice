//Current http://phaser.io/tutorials/making-your-first-phaser-game/part7

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() 
{
	//Load Assets
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player, ground, ledge, cursors;

function create() 
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Creates Sky
	game.add.sprite(0, 0, 'sky');
	//Creates Platforms (ground/ledges) and enables physics for all of them
	platforms = game.add.group();
	platforms.enableBody = true;
	//Creates immovable grounds
	ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	//Creat immovable ledges
	ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;
	
	//Player Sprites
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	game.physics.arcade.enable(player);
	//Adds gravity and bounce
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 500;
	//Player collision with the world edge
	player.body.collideWorldBounds = true;
	//Player animations
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	//Player control
	cursors = game.input.keyboard.createCursorKeys();
}

function update() 
{
	//Collision between playtforms and player
	var hitPlatform = game.physics.arcade.collide(player, platforms);
	
	//Player x movement
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
	

	if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	{
        player.body.velocity.y = -400;
	}
}
