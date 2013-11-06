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

var numberOfPrimes = 20000;
var startTime;
var stopTime;
var textBox;

function JSPrimeTest(){
 	textBox = document.getElementById("mytext");
	setTimeout("findPrimes("+numberOfPrimes+");", 1000);
}

function findPrimes(n){
	startTime = new Date();
	
	var prime = 0;
	for (var i=2; i<n+2; i++){
		if (isPrime(i)){
			// prime found!
		}
	}
	
	stopTime = new Date();
	
	var timeElapsed = stopTime.getTime() - startTime.getTime();
	textBox.innerHTML += "\n\nTime elapsed: " + timeElapsed + " ms";
}

function isPrime(n){
	for (var i=2; i<n; i++){
		if (i != n){
			if ((n % i) == 0){
				return false;
			}
		}
	}
	
	return true;
}