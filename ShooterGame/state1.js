var shooter = {};
shooter.state1 = function(){};
shooter.state1.prototype = {
  preload: function() {
      
  },
  create: function() {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      game.stage.backgroundColor = '#DDDDDD';
      console.log('state1');
      game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null. null, 1);
  },
  update: function() {
      
  }
};

function changeState(i, stateNum)
{
    console.log(i);
    game.state.start('state' + stateNum);
}