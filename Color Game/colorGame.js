var numSquares = 6;
var score = 0;
var correct = true;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var scoreDisplay = document.querySelector("#score");

init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
	resetScore();
}

resetButton.addEventListener("click", function(){
	if(correct){
		resetScore();
	}
	reset();
});



function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
	messageDisplay.textContent = " ";
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "steelblue";
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color form array
	pickedColor = pickColor();
	//Change colorDisplay to match new picked color
	colorDisplay.textContent = pickedColor;
	//Change Colors of Square
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	correct = true;
}

function resetScore() {
	score = 0;
	scoreDisplay.textContent = score;
}

function addScore(){
	score++;
	scoreDisplay.textContent = score;
}
function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected")
			modeButtons[1].classList.remove("selected")
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
			resetScore();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square 
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				if(correct){
					addScore();
				}
				messageDisplay.textContent = "Correct!";
				h1.style.backgroundColor = clickedColor;
				changeColors(pickedColor);
				resetButton.textContent = "Play Again?";
				correct = false;
			} else {
				resetScore();
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}