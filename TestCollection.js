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
 
var TestCollection = function(testController){
	
	this.start = function(){
		startNextSubTest();
	}
	
	this.addSubTest = function(subTest){
		subTests.push(subTest);
	}
	
	this.subTestFinished = function(subTest){
		d(zelf.className, "SubTest " + subTest.className + " has finished in " + subTest.getTimeElapsed() + " ms");
		timeElapsed += subTest.getTimeElapsed();
		testController.subTestFinished(subTest);
		
		// "async call", so GUI doesn't freeze
		setTimeout(startNextSubTest, 1);
	}
	
	this.getNumberOfSubtests = function(){
		return subTests.length;
	}
	
	this.getTimeElapsed = function(){
		return timeElapsed;
	}
	
	var allTestsFinished = function(){
		if (currentTestIndex >= subTests.length){
			return true;
		}
		return false;
	}
	
	var startNextSubTest = function(){
		currentTestIndex++;
		if (allTestsFinished()){
			testController.testCollectionFinished(zelf);
		}
		else{
			var subTest = subTests[currentTestIndex];
			// d(zelf.className, "Starting new subtest " + subTest.className);
			subTest.start();
		}
	}

	// Various input versions of the original LoremIpsum input text
	this.myspan = testController.myspan;
	this.input_str = testController.input_str; // The LoremIpsum test text
	this.input_arr = testController.input_arr;
	this.numbers = testController.numbers;
	this.bitstream = testController.bitstream;
	this.bitstream_reverted = testController.bitstream_reverted;
	this.alphabet = testController.alphabet;
	this.input_str_short = "";
	for (var i=0; i<this.input_str.length; i++){
		if (i > this.input_str.length/5){
			break;
		}
		this.input_str_short += this.input_str.charAt(i);
	}
	
	var zelf = this;
	this.className = "className for Subtest not set";
	var subTests = new Array();
	var timeElapsed = 0;
	var currentTestIndex = -1;
}