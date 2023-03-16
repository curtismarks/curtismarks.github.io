/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //size limit of the board
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $('#board').height();

  //keys that make the paddles move.
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
      positionX:0,
      positionY:0,
      speedX: speedX,
      speedY: speedY,
      h: $(id).height(),
      w: $(id).width(),
      id: id,
    }
    return item;
  }

  //variables that helps the game function
  var player1Score = 0;
  var player2Score = 0;
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
    wallCollsionBall(ball);
    wallCollsion(player1);
    wallCollsion(player2);
    drawScore();
    ballHitPaddle();
    endGame();
  }
  
  /* 
  Called in response to pressed events.
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
  /* 
  Called in response to released events.
  */
  function handleKeyUp(event) {
    if(event.which === KEY.DOWN || event.which === KEY.UP || event.which === KEY.W || event.which === KEY.S){
      player1.speedY = 0;
      player2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //positions each object to their spot 
  function drawItem(obj){
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  //updates the score
  function drawScore(){
    $('#scoreIDPlayer1').text(player1Score);
    $('#scoreIDPlayer2').text(player2Score);
  }

  //class when obj hits the wall
  function wallCollsion(obj){
    if(obj.y < 0){
      obj.y = 0;
    }
    if(obj.y > BOARD_HEIGHT - obj.h){
      obj.y = BOARD_HEIGHT  - obj.h;
    }
  }

  //sets ball to original locations
  function resetBall(){
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() > 0.5 ? -3 : 3);
    ball.speedY = (Math.random() > 0.5 ? -3 : 3);
  }

  // if ball hits the y walls, ball set goes back to middle whenever it hits left wall or right wall
  function wallCollsionBall(obj){
    if(obj.x > BOARD_WIDTH - obj.w){
      //award to points to other player
      player1Score++;
      //reset ball to middle
      resetBall();
    }
    if(obj.x < 0){
      //award to points to other player
      player2Score++;
      //reset ball to middle
      resetBall();
    }
    if(obj.y > BOARD_HEIGHT - obj.h){
      //bounce off of bottom border
      obj.speedY = -obj.speedY;
    }
    if(obj.y < 0){
      //bounces off of top border
      obj.speedY = -obj.speedY;
    }
  }
 
  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + $(obj1.id).width();
    obj1.bottomY = obj1.y + $(obj1.id).height();
    // TODO: Do the same for obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + $(obj2.id).width();
    obj2.bottomY = obj2.y + $(obj2.id).height();
    // TODO: Return true if they are overlapping, false otherwise
	  if ((obj1.rightX > obj2.leftX)&& 
      (obj1.leftX < obj2.rightX)&&
      (obj1.bottomY > obj2.topY)&& 
      (obj1.topY < obj2.bottomY)
    ){
      return true;
    }else{
      return false;
    }
  }

  function ballHitPaddle() {
    if(doCollide(ball, player1)){
      //change speed of ball
      //reverse ball
      ball.speedX = -ball.speedX;
    }
    if(doCollide(ball, player2)){
      //change speed of ball
      //reverse ball
      ball.speedX = -ball.speedX;
    }
  }

  //response to the speed of item.x and item.y
  function UpdateItem(obj){
    obj.x = obj.x + obj.speedX;
    obj.y = obj.y + obj.speedY;
  }

  
  //response to the points (10) to end
  function endGame() {
    if (player1Score === 10 || player2Score === 10) {
      // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
    $('#GameOver').show();
    $('#tryAgain').show();
   
    }else{
      $('#GameOver').hide();
      $('#tryAgain').hide();
    }
    
  }

}
