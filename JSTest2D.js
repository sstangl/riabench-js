/**
 * The testing class
 */
var Test2d = function(squareSize){
	function init(){
		var lastXPosition = 0.1;
		var lastYPosition = 0.1;
		
		for (var j=0; j<numOfRows; j++){
			var squares = new Array();
			var r = Math.round(Math.random() * 1000) % 255;
			var g = Math.round(Math.random() * 2000) % 255;
			var b = Math.round(Math.random() * 3000) % 255;
			// console.log(r + " " + g + " " + b);
			squareColor = "rgb(" + r + ", " + g + ", " + b + ")";
			for (var i=0; i<numOfSquaresPerRow; i++){
				var square = new Square(lastXPosition, lastYPosition, squareSize, squareColor);
				squares.push(square);
				drawSquare(square);
				// if (debugEnabled) console.log("Square position calc: " + lastXPosition + "+=" + squareSize + "+" + squareDistance);
				squares.push(square);
				lastXPosition += squareSize + 1;
			}
			// console.log(getRand(4));
			lastXPosition = 0.1;
			rows.push(squares);
		}
		
		secondInterval = window.setInterval(function(){
			framesElapsed.push(fps);
			document.getElementById("frameRate").innerHTML = "Current fps: " + fps + "<br>" + "Average fps: " + getAverageFps();
		}, 1000);
	}
	
	function getAverageFps(){
		var average = 0;
		for (var i=0; i<framesElapsed.length; i++){
			average += framesElapsed[i];
		}
		return Math.round(average / framesElapsed.length);
	}
	
	function letItRain(){
		interval = window.setInterval(function(){
			moveAllSquares();
		}, 17);
	}
	
	function updateFps(){
		if (frames.length > 30){
			frames.splice(0, 1);
		}
		
		var currTime = new Date().getTime();
		
		frames.push(currTime);
		
		var frameRate = document.getElementById("frameRate");
		var frameRateText = 1000 / ((currTime - frames[0]) / (frames.length - 1)) + "";
		frameRateText = frameRateText.replace(/(^[^.]+\...).*/, "$1");
		frameRateArray.push(frameRateText);
		frameRateText = Math.round(frameRateText);
		fps = frameRateText;
		
		var delta = currTime - frames[frames.length - 2];
		
		if (isNaN(delta)){
			delta = 0;
		}
	}
	
	function moveAllSquares(){
		
		updateFps();
		
		// Step through each row..
		for (var j=0; j<rows.length; j++){
			var squares = rows[j];
			// Step through each square in the current row...
			for (var i=0; i<squares.length; i++){
				// If the current square has not started yet...
				if (squares[i] != null){
					if (squares[i].started == false){
						// Start the square with a chance of 50/50
						if (Math.random() > 0.6){
							// If the current row is not the very first one...
							if (j > 0){
								// ... flag it to run on the next iteration
								var priorSquares = rows[j-1];
								
								// If the prior square has not been destroyed yet
								if (priorSquares[i] != null){
									if (priorSquares[i].started == true && priorSquares[i].y > squareSize+1){
										squares[i].started = true;
									}
								}
								// If the prior square was already destroyed..
								else{
									// Start the current one
									squares[i].started = true;
								}
							}
							// If this is the first row...
							else{
								// .. let it run on the next iteration
								squares[i].started = true;
							}
						}
					}
					// If the current square has already started running...
					else{
						// ... then keep running...
						if (squares[i].y < (canv.height-squareSize)){
							moveSquare(squares[i], squares[i].x, accelerate(squares[i].timeElapsedFalling++));
						}
						// ... until it reached the end of the canvas
						else{
							squares[i].finished = true;
							moveSquare(squares[i], squares[i].x, canv.height-squareSize);
						}
					}
				}
			}
		}
		if (allSquaresFinished() == true){
			// console.log("average: " + getAverage(frameRateArray));
			window.clearInterval(interval);
			window.clearInterval(secondInterval);
			document.getElementById("frameRate").innerHTML = "Done!<br>Average fps: " + getAverageFps();
		}
	}
	
	function getAverage(arr){
		var res = 0;
		for (var i=1; i<arr.length; i++){
			res += Number(arr[i]);
		}
		res = res / (arr.length-1);
		return res;
	}
	
	/**
	 * Returns a number between 0 and max
	 */
	function getRand(max){
		return Math.round(Math.random() * 10) % max;
	}
	
	function allSquaresFinished(){
		for (var j=0; j<rows.length; j++){
			var row = rows[j];
			for (var i=0; i<row.length; i++){
				if (row[i] != null){
					if (row[i].finished == false) return false;
				}
			}
		}
		return true;
	}
	
	function accelerate(value){
		return quadraticIncrease(value);
	}
	
	function quadraticIncrease(value){
		return (value * value)/80;
	}
	
	function moveSquare(square, newX, newY){
		removeSquare(square);
		square.x = newX;
		square.y = newY;
		drawSquare(square);
	}
	
	/*
	 * Will remove the square from the stage but NOT destroy the object itself.
	 */
	function removeSquare(square){
		ctx.clearRect(square.x-1, square.y-1, square.size+2, square.size+2);
	}
	
	function drawSquare(square){
		ctx.fillStyle = square.color;
		ctx.fillRect(square.x, square.y, square.size, square.size);
	}
	
	function getnumOfSquaresPerRow(){
		// if (debugEnabled) console.log("Number of squares: " + canv.width + "/" + "(" + squareSize + "+" + squareDistance + ")");
		return Math.round(canv.width / (squareSize + squareDistance));
	}
	
	function getSquareDistance(){
		var dis = Math.round(squareSize / 3);
		if (dis <= 0){
			return 1;
		}
		return dis;
	}
	
	var secondInterval;
	var framesElapsed = new Array();
	frameRateArray = new Array();
	var frames = [];
	var debugEnabled = false;
	var fps = 0;
	var numOfRows = 20;
	var self = this;
	var rows = new Array();
	var canv = document.getElementById("mycanvas");
	canv.width = 1024;
	canv.height = 768;	
	var ctx = canv.getContext("2d");
	var squareDistance = getSquareDistance();
	var numOfSquaresPerRow = getnumOfSquaresPerRow();
	init();
	letItRain();
}

/**
 * Class, which represents one square
 */
var Square = function(x, y, size, color){
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.started = false;
	this.finished = false;
	this.timeElapsedFalling = 0;
}