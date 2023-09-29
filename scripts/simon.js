var colors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){

    userClickedPattern = []

    var randomNum = Math.floor(Math.random()*4);
    
    var randomColor = colors[randomNum];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100)
    playSound(randomColor)

    level++;
    $(".title").text("level "+level)}

$(".btn").click(function(){

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animation(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

})

function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();

}

function animation(name){

    $("#"+name).addClass("pressed");
    setTimeout( function()  {
        $("#"+name).removeClass("pressed");
    }, 100);
}

var started = false;
var level = 0;

$(document).keypress(function(event){
    if (event.key === " "){
        if(started === false){
            nextSequence();
            $(".title").text("level "+level);
            started = true;
        }
    }
})

function checkAnswer(currentLevel){

    if( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {

        console.log("wrong")

        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();

        $(".title").text("Game Over BabyGirl..")

        $("body").addClass("gameOver");
        setTimeout( function()  {
            $("body").removeClass("gameOver");
        }, 100);

        gameOver();
    }
}

function gameOver(){

    started = false;
    gamePattern = []
    level = 0

}