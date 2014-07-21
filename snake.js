
var d;

var w = 500,h = 500, cw = 15;
var c = document.getElementById("mycanvas");
c.style.border = "saddlebrown 4px solid";
var ctx = c.getContext("2d");

var image = document.getElementById("img");
var i, begX = 20, begY = 2, foodX = 6, foodY = 10, inter, length=5, snake = [], score=0;
var score_text = "Score: "+ score;
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, w, h);
ctx.fillText(score_text, 5, 475)
for(i=begY;i<begY+length;++i)
	draw(begX, i);
draw(foodX, foodY);


function init()
{
	ctx.clearRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	for(i=0;i<length;++i)
	{
		snake[i] = {x: begX, y: begY};
		begY++;
	}
	for(i=0;i<length;++i)
		draw(snake[i].x, snake[i].y);
	draw(foodX, foodY); //Food
	if(typeof inter != "undefined")
		clearInterval(inter);	
	inter = setInterval("start()", 60)
}

function start()
{
	ctx.clearRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h)
	increase_length();
	for(i=0;i<length-1;++i)
	{
		snake[i].x = snake[i+1].x;
		snake[i].y = snake[i+1].y;
	}
	if(d == "down")
		snake[length-1].y++;
	else if(d == "left")
		snake[length-1].x--;
	else if(d == "right")
		snake[length-1].x++;
	else
		snake[length-1].y--;
	for(i=0;i<length;++i)
		draw(snake[i].x, snake[i].y);
	score_text = "Score: " + score;
	ctx.fillText(score_text, 5, 475)
	check_endgame();
}

function check_endgame()
{
	var x = snake[length-1].x;
	var y = snake[length-1].y;
	if(x == -1 || x*cw >= w-cw+2 || y == -1 || y*cw >= h-cw-2)
	{
		ctx.clearRect(0, 0, w, h);
		ctx.strokeStyle = "black"
		ctx.strokeRect(0, 0, w, h);
    		ctx.drawImage(img, 20, 15);		
    		clearInterval(inter);
	}
	for(i=0;i<length-1;++i)
	{
		if(y == snake[i].y && x == snake[i].x)
		{
			ctx.clearRect(0, 0, w, h);
			ctx.strokeStyle = "black";
			ctx.strokeRect(0, 0, w, h);
			ctx.drawImage(img, 20, 15);
			clearInterval(inter);
		}
	}
}
function increase_length()
{
	var	x = snake[length-1].x;
	var y = snake[length-1].y;
	if(x == foodX && y == foodY)
	{
		length += 1;
		snake[length-1] = {x: foodX, y: foodY};
/*		foodX = Math.round(Math.random()*31);
		foodY = Math.round(Math.random()*31);*/
		getrandom();
		score+=1;
	}
	draw(foodX, foodY);
}
function getrandom()
{
	foodX = Math.round(Math.random()*31);
	foodY = Math.round(Math.random()*31);
	for(i=0;i<length;++i)
	{
		if(snake[i].x == foodX && snake[i].y == foodY)
			getrandom();
	}
}
function draw(x, y)
{
	ctx.strokeStyle = "white"
	ctx.fillStyle = "red";
	ctx.fillRect(x*cw, y*cw, cw, cw)
	ctx.strokeRect(x*cw, y*cw, cw, cw)
}
document.onkeydown = key;
function key(e)
{
		var event = e || window.Event;
	//	console.log(event.keyCode);
		if(event.keyCode == 32)
		{
			d = "down";
			var p = document.getElementById("sub-head");
			p.style.display = "none";
			init();
		}
		else if(event.keyCode == 37 && d != "right" && d != "left")
			d = "left";
		else if(event.keyCode == 38 && d != "down" && d != "up")
			d = "up"
		else if(event.keyCode == 39 && d != "left" && d != "right")
			d = "right"
		else if(event.keyCode == 40 && d != "up" && d != "down")
			d = "down"
}
