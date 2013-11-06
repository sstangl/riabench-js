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
var JSRIABench = function(){
	this.start = function(){
		generateCollections();
		numberOfSubtests = this.getNumberOfSubtests();
		this.startNextTestCollection();
	}
	
	this.allTestCollectionsFinished = function(){
		if (currentTestCollection >= this.testCollections.length){
			return true;
		}
		return false;
	}
	
	this.subTestFinished = function(subTest){
		increaseProgressBar();
	}
	
	// "Event handler" when a collection has finished
	this.testCollectionFinished = function(testCollection){
		d(zelf.className, "TestCollection "+ testCollection.className + " has finished in " + testCollection.getTimeElapsed() + " ms");
		timeElapsed += testCollection.getTimeElapsed();
		this.startNextTestCollection();
	}
	
	this.startNextTestCollection = function(){
		currentTestCollection++;
		if (this.allTestCollectionsFinished()){
			d(this.className, "Benchmark finished in " + timeElapsed + " ms");
			var statusLabel = document.getElementById("status");
			statusLabel.innerHTML = "All tests finished in " + timeElapsed + " ms";
		}
		else{
			var testCollection = this.testCollections[currentTestCollection];
			d(zelf.className, "Starting new testCollection " + testCollection.className);
			testCollection.start();
		}
	}
	
	this.addTestCollection = function(testCollection){
		this.testCollections.push(testCollection);
	}

	this.getNumberOfSubtests = function(){
		var tmp = 0;
		for (var i=0; i<this.testCollections.length; i++){
			tmp += this.testCollections[i].getNumberOfSubtests();
		}
		return tmp;
	}
	
	/**
	 * Will increase the progressbar by 1 tick if called
	 * Important: numOfTests must be set to the correct value
	 * and currTestNum must be set to 1 initially.
	 */
	var increaseProgressBar = function(){
		zelf.currTestNum++;
		zelf.numberOfSubtests = zelf.getNumberOfSubtests();
		var bar = document.getElementById("progress");
		var multiplicator = 100 / (zelf.numberOfSubtests+1);
		var newWidth = zelf.currTestNum * multiplicator;		
		bar.style.width = newWidth + "%";
	}
	
	var generateCollections = function(){
		zelf.addTestCollection(new StringTestCollection(zelf));
		zelf.addTestCollection(new ArrayTestCollection(zelf));
		zelf.addTestCollection(new RelationalOperatorTestCollection(zelf));
		zelf.addTestCollection(new MathTestCollection(zelf));
	}
	
	var str2NumArray = function(str){
		var tmp = new Array();
		// Fill the unicode-value-version of input
		for (var i=0; i<str.length; i++){
			tmp.push(str.charCodeAt(i));
		}
		return tmp;
	}
	
	var str2StrArr = function(str){
		var tmp = new Array();
		// Fill the input array
		for (var i=0; i<str.length; i++){
			tmp[i] = str.charAt(i);
		}
		return tmp;
	}
	
	var str2Bitstream = function(str){
		var res = "";
		for (var i=0; i<str.length; i++){
			res += dec2bin(str.charCodeAt(i));
		}
			
		return res;
	}

	/**
	 * Will return a binary representation of a decimal value
	 * @param nub Number The number to convert
	 * @return String The binary representation of nub
	 */
	var dec2bin = function(nub) {
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
	 * Reverts a given String. Example: s="Hello". Then revert(s)="olleH".
	 * @param str String The string to revert
	 * @return String The reverted version of str
	 */
	function revertBitstream(str){
		var ret = "";
		for (var i=((str.length)-1); i>=0; i--){
			ret += str.charAt(i);
		}
		return ret;
	}
	
	this.className = "JSRIABench";
	var timeElapsed = 0;
	var zelf = this;
	this.testCollections = new Array();
	var numberOfSubtests = -1;
	var currentTestCollection = -1;
	this.currTestNum = 1; // 1 = first test
	
	// Various input versions of the original LoremIpsum input text
	this.myspan = document.getElementById("myspan");
	this.input_str = document.getElementById("txt").innerHTML; // The LoremIpsum test text	
	this.input_arr = str2StrArr(this.input_str);
	this.numbers = str2NumArray(this.input_str);
	this.bitstream = str2Bitstream(this.input_str);
	this.bitstream_reverted = revertBitstream(this.bitstream);
	this.alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	this.start();
}