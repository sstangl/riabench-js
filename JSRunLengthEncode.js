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

var textBox;
var startTime;
var stopTime;
debugEnabled = false;
debug = "";

/**
 * Init-function
 */
function JSRunLengthEncode(){
 	textBox = document.getElementById("mytext");
	setTimeout("startEncoding()", 1000);
}

/**
 * Will start the test
 */
function startEncoding(){
	var myInputData = (document.getElementById("inputData")).innerHTML;
	response = getAsBitstream(myInputData);
	startTime = new Date();

	// encode
	var encodedText = rle_encode(response);
	stopTime = new Date();
	
	// Get compression rate in %
	var compressionRate = getCompressionRate(response.length, encodedText.length);
	
	// Output compression rate and elapsed time
	var timeElapsed = stopTime.getTime() - startTime.getTime();
	textBox.innerHTML += "<br />" + compressionRate + "% compression rate<br />";
	textBox.innerHTML += "<br />Time elapsed: " + timeElapsed + " ms";
}

/**
 * Will convert a string to its binary representation
 */
function getAsBitstream(str){
	var res = "";
	for (var i=0; i<str.length; i++){
		res += dec2bin(str.charCodeAt(i));
	}
	
	return res;
}

/**
 * Will return a binary representation of a decimal value
 */
function dec2bin(nub) {
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;
   if (nub.length == 0) alert("Input is Blank");
   for (i = 0; i < nub.length && blnResult == true; i++)
      {
      strChar = nub.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
	if (blnResult != false) 
	{
		var i;
		var j;
		var result="";
		var ib;
		while (nub != 1)
			{
				j = nub % 2;
				i = (nub - j) / 2
				nub = i;
				ib = j.toString();
				result = ib + result;
			}
		result = "1" + result;
		return result;
	}
	return "Numbers Only"
}

/**
 * Will return the compression rate in %
 */
function getCompressionRate(oldLength, newLength){
	var rate = 100 - ((newLength / oldLength) * 100);
	rate = Math.round(rate * 10) / 10;
	return rate;
}

/**
 * Will compress any text-string using run-length encoding
 */
function rle_encode(text){
	
	var result = "";

	for (var i=0; i<text.length; i++){
	
		if (debugEnabled) debug += "\nPosition " + i + " / " + text.length + "\n";

		if (i >= text.length){
			break;
		}

		var numOfRedundances = getNumOfRedundances(i, text);
		
		if (numOfRedundances > 2){
			if (debugEnabled) debug += "Number of Redundances " + numOfRedundances + "\n";
			text = compress(i, numOfRedundances, text);
			// i = 2 + numOfDigits(numOfRedundances);
		}
	}
	// textBox.innerHTML += text;
	if (debugEnabled) console.log(debug);
	return text;
}

/**
 * Gets the number of digits of an integer, for example, 345 has 3 digits
 * Works only for integers bigger than 0 !
 */
function numOfDigits(num){
	var counter = 0;
	while (true){
		if (num < 1){
			return counter;
		}
		
		num = num / 10;
		counter++;
	}
}

/**
 * Does the actual compression
 */
function compress(startpoint, len, text){

	if (debugEnabled) debug += "Compressing " + text.charAt(startpoint) + " x" + len + "\n";

	// Do nothing if startpoint is out of index
	if (startpoint >= text.length){
		return text;
	}

	var compressedString = "";

	var separator = "ERROR";
	if (text.charAt(startpoint) == "1"){
		separator = "A";
	}
	else{
		separator = "B";
	}
	
	var restIndex = startpoint + len + 1;
	if (restIndex < text.length) {
		compressedString = text.substr(0, startpoint) + separator + (len+1) + separator + text.substr(restIndex, text.length);
	}
	else{
		compressedString = text.substr(0, startpoint) + separator + (len+1) + separator;
	}
	
	if (compressedString != ""){
		text = compressedString;
	}
	else{
		compressedString = text;
	}
	
	return compressedString;
}

/**
 * Returns the number of redundant character occurences
 */
function getNumOfRedundances(pos, text){
	var numOfRedundancesFound = 0;
	
	if (pos+1 < text.length){
		var charToCheck = text.charAt(pos);
		for (var i=pos+1; i<text.length; i++){
			if (debugEnabled) debug += "Comparing " + text.charAt(i) + " with " + charToCheck + "\n";
			if (text.charAt(i) == charToCheck){
				if (debugEnabled) debug += "Was the same\n";
				numOfRedundancesFound++;
			}
			else{
				if (debugEnabled) debug += "Not the same. Aborting\n";
				break;
			}
		}
	}
	
	return numOfRedundancesFound;
}