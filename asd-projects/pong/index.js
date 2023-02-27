/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $('#board').height();

  var KEY ={
    "UP": 38,
    "DOWN": 40,
    "W":87,
    "S":83,
  }
  // Game Item Objects
  function GameItem (x,y,speedX,speedY,id){
    var item={
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      h: $(id).height(),
      w: $(id).width(),
      id: id,
    }
    return item;
  }

  

  var player1 = GameItem(10, 200, 0, 0, '#player1');
  var player2 = GameItem(BOARD_WIDTH - 10 - $('#player2').width(), 200, 0, 0, '#player2');
  var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2,(Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3),'#ball');

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawItem(player1);
    drawItem(ball);
    drawItem(player2);
    UpdateItem(player1);
    UpdateItem(player2);
    UpdateItem(ball);
    stopBall();
    stopPlayers();
    wallCollsion(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.S){
      player1.speedY = 5;
      console.log("You've moved down. YAY!!!");
    }
    if(event.which === KEY.W){
      player1.speedY = -5;
      console.log("You've moved up. YAY!!!");
    }
  
    if (event.which === KEY.UP) {
      player2.speedY = -5;
      console.log("W pressed");
    }
    if (event.which === KEY.DOWN) {
      player2.speedY = 5;
      console.log("s pressed");
    }
  }
  function handleKeyUp(event) {
    if(event.which === KEY.DOWN || event.which === KEY.UP || event.which === KEY.W || event.which === KEY.S){
      player1.speedY = 0;
      player2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function drawItem(obj){
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  function wallCollsion(obj){
    return obj < 0 ? 0 : obj > 255 ? 255 : obj;
  }

  function doCollide(obj1, obj2) {
    return obj1 - obj2;
  }
  
  if (doCollide(ball, player1)) {
    ball.speedY = 5;
  }

  if (doCollide(ball, player2)) {
    ball.speedY = -5;
  }

  function UpdateItem(obj){
    obj.x = obj.x + obj.speedX;
    obj.y = obj.y + obj.speedY;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
