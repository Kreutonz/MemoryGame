var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//next iteration of game
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);               // changes the title content of the webpage
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);                   //adds color to sequence
  playSound(randomChosenColour);
  playAnimation(randomChosenColour);
}

//button animation for specific button given color argument
function playAnimation(color) {
  $("#" + color).fadeOut(500).fadeIn(500);
}

//plays the sound of the color given color argument
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {$("#" + currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function() {nextSequence()}, 1000);
      }
    }else{
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key To Restart");
      setTimeout(function() {$("body").removeClass("game-over")}, 200);
      startOver();
    }
}

function startOver(){
  gameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

//if game hasnt started, waits for keypress, then starts the game
$(document).keydown(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
