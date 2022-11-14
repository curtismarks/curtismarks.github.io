/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var WALKER_HEIGHT = $("#walker").height();
  var WALKER_WIDTH = $("#walker").width();

  // Game Item Objects
  var KEY ={
    "UP": 38,
    "DOWN": 40,
    "LEFT": 39,
    "RIGHT": 37,
  }
  //  one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);    // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);    // change 'eventType' to the type of event you want to handle
  //other variables
  var positionX = 0; // the x-coordinate location for the box
  var speedX = 0; // the speed for the box along the x-axis
  var positionY = 0; // the y-coordinate location for the box
  var speedY = 0; // the speed for the box along the y-axis
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    stopWalker();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.DOWN){
      speedY = 5;
      console.log("You've moved down. YAY!!!");
    }
    if(event.which === KEY.RIGHT){
      speedX = -5;
      console.log("You've moved right. YAY!!!");
    }
    if(event.which === KEY.UP){
      speedY = -5;
      console.log("You've moved right. YAY!!!");
    }
    if(event.which === KEY.LEFT){
      speedX = 5;
      console.log("You've moved left. YAY!!!");
    }
  }
  function handleKeyUp(event){
    if(event.which === KEY.DOWN || event.which === KEY.UP){
      speedY = 0;
    }
    if(event.which === KEY.RIGHT || event.which === KEY.LEFT){
      speedX = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    positionX +=speedX;
    positionY +=speedY;
  }

  function redrawGameItem(){
    $("#walker").css("top", positionY);
    $("#walker").css("left", positionX);
    
  }

  function stopWalker(){
    if(positionX > BOARD_WIDTH - WALKER_WIDTH){
      positionX = BOARD_WIDTH - WALKER_WIDTH;
    }
    if(positionY > BOARD_HEIGHT - WALKER_HEIGHT){
      positionY = BOARD_HEIGHT - WALKER_HEIGHT;
    }
    if(positionY < 0){
      positionY = 0;
    }
    if(positionX < 0){
      positionX = 0;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
