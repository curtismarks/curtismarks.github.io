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
                { "type": "drones", "x": 400, "y": groundY -100},
                { "type": "drones", "x": 600, "y": groundY -100},
                { "type": "drones", "x": 800, "y": groundY -100},

                { "type": "guard", "x": 500, "y": groundY -100},
                { "type": "guard", "x": 700, "y": groundY -100},
                { "type": "guard", "x": 900, "y": groundY -100},

                { "type": "king", "x": 900, "y": groundY -100},

                { "type": "witch", "x": 900, "y": groundY -100},

                { "type": "half-dollar", "x": 200, "y": groundY -100},
                { "type": "dollar", "x": 200, "y": groundY -100},
                { "type": "Hundred", "x": 300, "y": groundY -100},
                { "type": "half", "x": 350, "y": groundY -100},
            ]
    };
    window.levelData = levelData;
     // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODO 6 and on go here
    // BEGIN EDITING YOUR CODE HERE

        function createDrones(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/Drones.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -20;
            obstacleImage.y = -20;
            obstacleImage.scaleX = 0.20;
            obstacleImage.scaleY = 0.20;
        }
        
        function createGuard(x,y){

            var guard = game.createGameItem('enemy', 25);
            var royalGuard = draw.rect(50, 50, 'img/guard.png');
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
                guard.shrink(100, 100);
            }
            
            guard.onPlayerCollision = function(){
                game.changeIntergrity(10);
                guard.flyTo(100, 100);
            };

            guard.x = x;
            guard.y = y;
        }

        function createKing(x,y){

            var king = game.createGameItem('king', 25);
            var kingIsMad = draw.rect(50, 50, 'img/king.png');
            kingIsMad.x = -25;
            kingIsMad.y = -25;
            king.addChild(kingIsMad);
            king.x = 400;
            king.x = groundY -50;
            game.addGameItem(kingIsMad);
            king.velocityX = -1; //move the enemy 1 pixel to the left

           //The function detects if the projectile collides with enemy and the points will increase
           king.onprojectileCollision = function(){
            game.increaseScore(10);
            king.shrink(100, 100);
        }

        //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
        king.onPlayerCollision = function(){
            game.changeIntergrity(50);
            console.log('The enemy has it Halle');
        };

            king.x = x;
            king.y = y;
        }

        function createWitch(x,y){

            var witch = game.createGameItem('witch', 25);
            var evilWitch = draw.rect(50, 50, 'img/witch.png');
            evilWitch.x = -25;
            evilWitch.y = -25;
            witch.addChild(evilWitch);
            witch.x = 400;
            witch.x = groundY -50;
            game.addGameItem(evilWitch);
            witch.velocityX = -1; //move the enemy 1 pixel to the left

           //The function detects if the projectile collides with enemy and the points will increase
           witch.onprojectileCollision = function(){
            game.increaseScore(10);
            witch.shrink(100, 100);
        }

        //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
        witch.onPlayerCollision = function(){
            game.changeIntergrity(100);
            console.log('The enemy has it Halle');
        };

            witch.x = x;
            witch.y = y;
        }

        function createHalfDollar(x, y){

            var reward = game.createGameItem('reward', 25);
            var coin = draw.rect(50, 50, 'img/half-dollar.png');
            coin.x = -25;
            coin.y = -25;
            reward.addChild(coin);
            reward.x = 400;
            reward.x = groundY -50;
            game.addGameItem(coin);
            reward.velocityX = -1; //move the enemy 1 pixel to the left

            reward.x = x;
            reward.y = y;

            //The function detects if the projectile collides with enemy and the points will increase
            reward.onprojectileCollision = function(){
                game.increaseScore(10);
                reward.shrink(100, 100);
            }

            //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
            reward.onPlayerCollision = function(){
                game.changeIntergrity(10);
                console.log('The enemy has it Halle');
            };
        }
        
        function createDollar(x, y){

            var reward = game.createGameItem('reward', 25);
            var dollar = draw.rect(50, 50, 'img/1_dollar_bill.png');
            dollar.x = -25;
            dollar.y = -25;
            reward.addChild (dollar);
            reward.x = 400;
            reward.x = groundY -50;
            game.addGameItem (dollar);
            reward.velocityX = -1; //move the enemy 1 pixel to the left

            reward.x = x;
            reward.y = y;

            //The function detects if the projectile collides with enemy and the points will increase
            reward.onprojectileCollision = function(){
                game.increaseScore(10);
                reward.shrink(100, 100);
            }

            //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
            reward.onPlayerCollision = function(){
                game.changeIntergrity(10);
                console.log('The enemy has it Halle');
            };
        }
        
        function createTenDollars(x, y){

            var reward = game.createGameItem('reward', 25);
            var dollars = draw.rect(50, 50, 'img/10_dollar_bill.png');
            dollars.x = -25;
            dollars.y = -25;
            reward.addChild (dollars);
            reward.x = 400;
            reward.x = groundY -50;
            game.addGameItem (dollars);
            reward.velocityX = -1; //move the enemy 1 pixel to the left

            reward.x = x;
            reward.y = y;

            //The function detects if the projectile collides with enemy and the points will increase
            reward.onprojectileCollision = function(){
                game.increaseScore(10);
                reward.shrink(100, 100);
            }

            //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
            reward.onPlayerCollision = function(){
                game.changeIntergrity(10);
                console.log('The enemy has it Halle');
            };
        }

        function createHundredDollars(x, y){

            var reward = game.createGameItem('reward', 25);
            var coin = draw.rect(50, 50, 'img/100_dollar_bill.png');
            coin.x = -25;
            coin.y = -25;
            reward.addChild (coin);
            reward.x = 400;
            reward.x = groundY -50;
            game.addGameItem (coin);
            reward.velocityX = -1; //move the enemy 1 pixel to the left

            reward.x = x;
            reward.y = y;

            //The function detects if the projectile collides with enemy and the points will increase
            reward.onprojectileCollision = function(){
                game.increaseScore(10);
                reward.shrink(100, 100);
            }

            //the function detects if the enemy collides with Halle and the enemy will deal damage to Halle
            reward.onPlayerCollision = function(){
                game.changeIntergrity(10);
                console.log('The enemy has it Halle');
            };
        }

        for(var i = 0;i < levelData.gameItems.length;i++){
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "drones"){
                createDrones(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "guard") {
                createGuard(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "king") {
                createKing(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "witch") {
                createWitch(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "half-dollar") {
                createHalfDollar(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "dollar") {
                createDollar(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "ten") {
                createTenDollars(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "hundred") {
                createHundredDollars(gameItem.x, gameItem.y);
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
