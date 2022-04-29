let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let starts = false;
let level = 0;

$(document).keypress(function(e){
    if (starts == false){
        $("#level-title").text("Level " + level) 
        nextSequence()
        starts = true;
    }
})


$(".btn").click(function(e){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  
      } else {
  
        console.log("wrong");
  
        playSound("wrong");
  
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
    
}

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

    level += 1;
    $("#level-title").text("Level " + level)
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)
}

//1. Create a new function called startOver().
function startOver(){

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    starts = false
}


