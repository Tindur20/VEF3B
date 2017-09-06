"use strict";
var tala = 20;
var container = document.getElementById('svg');	
function getRandom(min, max){
	return Math.random() * (max - min) + min;
}

function Snjor(){
	for (var i = 0;i < 75; i++) {			
		var snow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		snow.setAttributeNS(null, "class", "snow");	

		snow.setAttribute("cx", getRandom(1,100) + '%');
		snow.setAttribute("cy", '-' + getRandom(1,100));
		snow.setAttribute("r", getRandom(1,4));
		
		container.appendChild(snow);
	}
}

Snjor();

