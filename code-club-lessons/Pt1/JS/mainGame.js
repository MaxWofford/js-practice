//New variable
var player;

var gameVar = {
    //Preload loads assets
    preload: function () {
        //Loads the image "yay.jpg" and names it "someImage"
        game.load.image("someImage", "Assets/yay.jpg");
    }, 
    //Create runs only at the beginning
    create: function() {
        //Writes in the console "its working"
        console.log('its working');
        
        //Adds image called "someImage" to coordinate 50, 50
        player = game.add.sprite(10, -40, "someImage"); 
        
    }, 
    //Update runs over and over
    update: function () {
        console.log('hello');
        
        player.x += 1;
    }
    
};