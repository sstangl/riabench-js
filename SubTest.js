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

var SubTest = function(testCollection) {
	this.getTimeElapsed = function() {
		return timeElapsed;
	}
	
	this.start = function() {
		var startDate = new Date();
		this.startAlgorithm();
		var stopDate = new Date();
		timeElapsed = getDateDifference(startDate, stopDate);

		// Dispatch an "event", that the test has finished
		testCollection.subTestFinished(this);
	}
	
	this.getTimeElapsed = function(){
		return timeElapsed;
	}

	// Needs to be overwritten by subclass!
	var startAlgorithm = function() {
		d("Method startAlgorithm in SubTest was not overwritten!");
	}
	
	var getDateDifference = function(startDate, stopDate) {
		return stopDate.getTime() - startDate.getTime();
	}
	
	var timeElapsed = 0;
}