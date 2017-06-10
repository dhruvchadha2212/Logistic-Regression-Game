function sendData(x, y, stat) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "training_data.php?x="+x+"&y="+y+"&stat="+stat, true);
	xmlhttp.send();
}


var stone = document.getElementById("stone");
var target = document.getElementById("target");
target.style.left = 1000;
target.style.top = 150;
var posX = 0;
var posY = 0;
var id2 = setInterval(function() {
	var stat = 0, x, y;
	target.style.backgroundColor = "green";
	var speed = Math.floor(1 + Math.random()*51);
	var initial_speed = speed;
	var id = setInterval(function() {
		stone.style.left = posX + "px";
		posX += speed;
		speed -= 1;
		if(speed == 0) {
			clearInterval(id);
			x = parseInt(stone.style.top);
			y = parseInt(initial_speed);
			posX = 0;
			posY = Math.floor(Math.random()*591);
			if((parseInt(stone.style.left) >= parseInt(target.style.left)) && (parseInt(stone.style.top) + 10 >= parseInt(target.style.top)) && (parseInt(stone.style.top) <= parseInt(target.style.top) + 300)) {
				target.style.backgroundColor = "red";
				stat = 1;
			}
			sendData(x, y, stat);
		}
	}, 5);
	stone.style.left = posX + "px";
	stone.style.top = posY + "px";
}, 300);
document.addEventListener("click", function() {clearInterval(id2);})


function receiveData() {
	hitButton.removeEventListener("click", receiveData);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			target.style.backgroundColor = "green";
			var toHit = JSON.parse(xmlhttp.responseText);
			posX = 0;
			stone.style.left = "0px";
			stone.style.top = parseInt(toHit[0]) + "px";
			speed = parseInt(toHit[1]);
			var id = setInterval(function() {
				stone.style.left = posX + "px";
				posX += speed;
				speed -= 1;
				if(speed == 0) {
					clearInterval(id);
					if((parseInt(stone.style.left) >= parseInt(target.style.left)) && (parseInt(stone.style.top) + 10 >= parseInt(target.style.top)) && (parseInt(stone.style.top) <= parseInt(target.style.top) + 300)) {
						target.style.backgroundColor = "red";
						stat = 1;
					}
					hitButton.addEventListener("click", receiveData);
				}
			}, 5);
		}
	}
	xmlhttp.open("GET", "trained.php", true);
	xmlhttp.send();
}
var hitButton = document.getElementById("hit");
hitButton.addEventListener("click", receiveData);