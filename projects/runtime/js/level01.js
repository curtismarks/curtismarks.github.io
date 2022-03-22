var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY -100},
                { "type": "sawblade", "x": 600, "y": groundY -100},
                { "type": "sawblade", "x": 800, "y": groundY -100},

                { "type": "guard", "x": 500, "y": groundY -100},
                { "type": "guard", "x": 700, "y": groundY -100},
                { "type": "guard", "x": 900, "y": groundY -100},

                { "type": "king", "x": 900, "y": groundY -100},

                { "type": "witch", "x": 900, "y": groundY -100},

                { "type": "reward", "x": 200, "y": groundY -100},
                { "type": "reward", "x": 300, "y": groundY -100},
                { "type": "reward", "x": 350, "y": groundY -100},
            ]
    };
    window.levelData = levelData;
     // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODO 6 and on go here
    // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -20;
            obstacleImage.y = -20;
            sawBladeHitZone.rotationalVelocity = 5; //rotates the saw blades
           
        }
        
        function createGuard(x,y){

            var guard = game.createGameItem('enemy', 25);
            var royalGuard = draw.rect(50, 50, 'red');
            royalGuard.x = -25;
            royalGuard.y = -25;
            guard.addChild(royalGuard);
            guard.x = 400;
            guard.x = groundY -50;
            game.addGameItem(royalGuard);
            guard.velocityX = -1; //move the enemy 1 pixel to the left

            guard.onprojectileCollision = function(){
                game.increaseScore(10);
                console.log('The enemy has it Halle');
                guard.shrink(100,100);
            }
            //the function detects if the proctjectile collides with halle and 
            guard.onPlayerCollision = function(){
                game.increaseScore(10);
                guard.flyTo(100,100);
            };

            guard.x = x;
            guard.y = y;
        }

        function createKing(x,y){

            var king = game.createGameItem('king', 25);
            var kingMad = draw.rect(50, 50, 'red');
            kingMad.x = -25;
            kingMad.y = -25;
            king.addChild(kingMad);
            king.x = 400;
            king.x = groundY -50;
            game.addGameItem(kingMad);
            king.velocityX = -1; //move the enemy 1 pixel to the left

            king.onprojectileCollision = function(){
                game.increaseScore(10);
                console.log('The enemy has it Halle');
                king.shrink(100,100);
            }
            //the function detects if the proctjectile collides with halle and 
            king.onPlayerCollision = function(){
                game.increaseScore(10);
                king.flyTo(100,100);
            };

            king.x = x;
            king.y = y;
        }

        function createWitch(x,y){

            var witch = game.createGameItem('witch', 25);
            var evilWitch = draw.rect(50, 50, 'red');
            evilWitch.x = -25;
            evilWitch.y = -25;
            witch.addChild(evilWitch);
            witch.x = 400;
            witch.x = groundY -50;
            game.addGameItem(evilWitch);
            witch.velocityX = -1; //move the enemy 1 pixel to the left

            witch.onprojectileCollision = function(){
                game.increaseScore(10);
                console.log('The enemy has it Halle');
                witch.shrink(100,100);
            }
            //the function detects if the proctjectile collides with halle and 
            witch.onPlayerCollision = function(){
                game.increaseScore(10);
                witch.flyTo(100,100);
            };

            witch.x = x;
            witch.y = y;
        }

        function createReward(x,y){

            //the function detects if the proctjectile collides with halle and
        
        

            var reward = game.createGameItem('reward', 25);
            var blueSquare = draw.rect(50, 50, 'blue');
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare);
            reward.x = 400;
            reward.x = groundY -50;
            game.addGameItem(blueSquare);
            reward.velocityX = -1; //move the enemy 1 pixel to the left

            reward.x = x;
            reward.y = y;

            //The function will
            reward.onprojectileCollision = function(){
                game.increaseScore(10);
                console.log('The enemy has it Halle');
                enemy.shrink(100,100);
            }

            //the function detects if the proctjectile collides with halle and
            reward.onPlayerCollision = function(){
                game.changeIntergrity(10);
                game.increaseScore(10);
                reward.flyTo(100,100);
            };
        }
        
        

        for(var i = 0;i < levelData.gameItems.length;i++){
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){
                createSawBlade(gameItem.x,gameItem.y);
            }

            if (gameItem.type === "guard") {
                createGuard(gameItem.x,gameItem.y);
            }

            if (gameItem.type === "reward") {
                createReward(gameItem.x,gameItem.y);
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
