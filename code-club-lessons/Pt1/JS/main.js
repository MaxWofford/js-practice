var game;

//here's where we actually create our game
function startGame () {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add("game", gameVar);    //create a game state called "game"
    game.state.start("game");   //start that game state we created ^^
    
}