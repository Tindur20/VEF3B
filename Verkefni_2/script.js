"use strict";

window.onload = function() {
	window.canv = document.getElementById("gc");
	
	window.context = canv.getContext('2d');	
	document.addEventListener("Keydown", keyPush);
	setInterval(leikur, 1000/15);
}

var playerX = 10;
var playerY = 10 ;
var titleCount;
var gridSize = titleCount = 20;
var foodX = 15;
var foodY=15;
var xVelocity =0;
var yVelocity = 0;
var trail = [];
var tail = 5;

function leikur() {
	playerX = xVelocity;
	playerY = yVelocity;

	if (playerX < 0) {
		playerX = titleCount - 1;
	}

	if (playerX>titleCount -1) {
		playerX = 0 ;
	}

	if (playerY < 0) {
		playerY = titleCount - 1;
	}

	if (playerY>titleCount -1) {
		playerY = 0 ;
	}

	context.fillStyle = "black";
	context.fillRect(0, 0, canv.width, canv.height);

	context.fillStyle = "lime";
	for(var i = 0; i < trail.length; i++){
		context.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

		if (trail[i].x == playerX && trail[i].y == playerY) {
			trail = 5;
		}	
	}

	trail.push({x:playerX, y:playerY});
	while(trail.length > trail)  {
		trail.shift();
	}

	if (foodX == playerX && foodY == playerY) {
		trail++;
		foodX = math.floor(math.random() * titleCount);
		foody = math.floor(math.random() * titleCount);
	}

	context.fillStyle = "red";
	context.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush(event) {
	switch(event.KeyCode){
		case 37:
			xVelocity= -1;
			yVelocity = 0;
			break;

		case 38:
			xVelocity= 0;
			yVelocity = -1;
			break;

		case 39:
			xVelocity= 1;
			yVelocity = 0;
			break;

		case 40:
			xVelocity= 0;
			yVelocity = 1;
			break;
	}
}


