/*
	Copyright (c) 2010 Timo Ernst - http://www.timo-ernst.net

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
 */
function JSJpegEncode(){
	setTimeout("start()", 1000);
}

function start(){
	var quality = 20;
	
	encoder = new JPEGEncoder(quality);
	
	var sourceImage = document.getElementById("sourceimage");
	var imagedata = getImageDataFromImage(sourceImage);
	
	startTime = new Date();
	var jpeg_version = encoder.encode(imagedata, quality);
	stopTime = new Date();
	
	sourceImage.src = jpeg_version;
	
	var timeElapsed = stopTime.getTime() - startTime.getTime();
	var output = document.getElementById("textbox");
	output.innerHTML = "Time elapsed: " + timeElapsed + " ms";
	sourceImage.setAttribute("style", "width: 1024; height: 768; display: inline;");
}

	// helper function to get the imageData of an existing image on the current page.
	function getImageDataFromImage(idOrElement){
		var theImg = (typeof(idOrElement)=='string')? document.getElementById(idOrElement):idOrElement;
		var cvs = document.createElement('canvas');

		cvs.width = theImg.width;
		cvs.height = theImg.height;
		var ctx = cvs.getContext("2d");
		ctx.drawImage(theImg,0,0);

		try{
			var result = ctx.getImageData(0, 0, cvs.width, cvs.height);
		}
		catch (e){
			alert(e.toString());
		}
		
		return result;
	}