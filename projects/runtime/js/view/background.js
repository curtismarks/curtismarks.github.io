var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        var houses= {
            house_1: 'img/medevil-house.png',
            house_2: 'img/house_2.png',
            house_3: 'img/house_3.png',
            house_4: 'img/house_4.png',
            house_5: 'img/house_5.png',
        };

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'darkBlue'); //creates a variable called backgroundFill and 
            background.addChild(backgroundFill); //add the background to the canvas
            

            // TODO: 3 - Add a moon and starfield
            for (var i =0; i < 100; i++){
                var circle = draw.circle(5,"white","lightGray",2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth - 300;
            moon.y = groundY - 450;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            //everytime this loop runs, it creates a building(s) and places the buildings randomly (can also place a build more than once)
            for(var i=0;i<5;++i) {
                var houseRndm = Math.floor(Math.random() * 5);
                if (houseRndm == 0){
                    buildings[i] = draw.bitmap('img/medevil-house.png');
                } else if (houseRndm == 1){
                    buildings[i] = draw.bitmap('img/house_2.png');
                }else if (houseRndm == 2){
                    buildings[i] = draw.bitmap('img/house_3.png');
                }else if (houseRndm == 3){
                    buildings[i] = draw.bitmap('img/house_4.png');
                }else if (houseRndm == 4){
                    buildings[i] = draw.bitmap('img/house_5.png');
                }
            }

            //this for loop can resize the buildings all at once and can make each building re-enters from the right side of the screen, once it goes through -200.
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = 160 * (i + .1);//gives space for the buldings.
                buildings[i].y = groundY - 288;
                buildings[i].scaleX = 0.24;
                buildings[i].scaleY = 0.24;
                background.addChild(buildings[i]);
            }
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 300;
            tree.y = groundY - 225;
            background.addChild(tree);
            

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; //takes the current value of tree.x and subtracts 1 pixel 
            //if tree goes less than -200 pixels then re-enters from the right
            if (tree.x < -200){
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            //if the buildings reach less than -200 pixels, it re-enters from the right
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 1.5;
                if (buildings[i].x < -200){
                    buildings[i].x = canvasWidth;
                }
            }



        } // end of update function - DO NOT DELETE
        
        //This function will can resize, move, and adds each houses\.
        function buildRndm(buildIndx){
            var rndhouse = Math.floor(Math.random() * 5)
            if (rndhouse == 0){
                background.removeChild(buildings[buildIndx]);
                buildings[buildIndx] = draw.bitmap(houses.house_1);
                buildings[buildIndx].x = canvasWidth -288;
                buildings[buildIndx].y = groundY -288;
                buildings[buildIndx].scaleX = 0.5;
                buildings[buildIndx].scaleY = 0.5;
                background.addChild(buildings[buildIndx]);
            } else if (rndhouse == 1){
                background.removeChild(buildings[buildIndx]);
                buildings[buildIndx] = draw.bitmap(houses.house_2);
                buildings[buildIndx].x = canvasWidth;
                buildings[buildIndx].y = groundY
                buildings[buildIndx].scaleX = 0.5;
                buildings[buildIndx].scaleY = 0.5;
                background.addChild(buildings[buildIndx]);
            } else if (rndhouse == 2){
                background.removeChild(buildings[buildIndx]);
                buildings[buildIndx] = draw.bitmap(houses.house_3);
                buildings[buildIndx].x = canvasWidth;
                buildings[buildIndx].y = groundY;
                buildings[buildIndx].scaleX = 0.5;
                buildings[buildIndx].scaleY = 0.5;
                background.addChild(buildings[buildIndx]);
            } else if (rndhouse == 3){
                background.removeChild(buildings[buildIndx]);
                buildings[buildIndx] = draw.bitmap(houses.house_4);
                buildings[buildIndx].x = canvasWidth;
                buildings[buildIndx].y = groundY - 288;
                buildings[buildIndx].scaleX = 0.5;
                buildings[buildIndx].scaleY = 0.5;
                background.addChild(buildings[buildIndx]);
            } else if (rndhouse == 4){
                background.removeChild(buildings[buildIndx]);
                buildings[buildIndx] = draw.bitmap(houses.house_5);
                buildings[buildIndx].x = canvasWidth;
                buildings[buildIndx].y = groundY - 288;
                buildings[buildIndx].scaleX = 0.5;
                buildings[buildIndx].scaleY = 0.5;
                background.addChild(buildings[buildIndx]);
            }
        }
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
