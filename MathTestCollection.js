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
/**
 * Extends TestCollection
 */
var MathTestCollection = function(testController){

	var testCollection = new TestCollection(testController);
	testCollection.className = "MathTestCollection";

	d(testCollection.className, "Loading new tests into " + testCollection.className);

	testCollection.addSubTest(new MathAdditionTest(testCollection));
	testCollection.addSubTest(new MathDivisionTest(testCollection));
	testCollection.addSubTest(new MathModuloTest(testCollection));
	testCollection.addSubTest(new MathMultiplicationTest(testCollection));
	testCollection.addSubTest(new MathPowerOfTest(testCollection));
	testCollection.addSubTest(new MathPowerOfTestApi(testCollection));
	testCollection.addSubTest(new MathSqrtTest(testCollection));
	testCollection.addSubTest(new MathSubtractionTest(testCollection));

	d(testCollection.className, "All subTests were loaded");

	return testCollection;
}

/**
 * Extends SubTest
 */
var MathAdditionTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathAdditionTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length-1; i++){
			res = testCollection.numbers[i] + testCollection.numbers[i+1];
		}
	}
	return subTest;
}

var MathDivisionTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathDivisionTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length-1; i++){
			res = testCollection.numbers[i] / testCollection.numbers[i+1];
		}
	}
	return subTest;
}

var MathModuloTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathModuloTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length-1; i++){
			res = testCollection.numbers[i] % testCollection.numbers[i+1];
		}
	}
	return subTest;
}

var MathMultiplicationTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathMultiplicationTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length-1; i++){
			res = testCollection.numbers[i] * testCollection.numbers[i+1];
		}
	}
	return subTest;
}

var MathPowerOfTest = function(testCollection){

	var powerOf = function(val, pow){
		if (pow == 0) return 1;
		
		var res = val;
		for (var i=0; i<pow-1; i++){
			res = res * val;
		}
		return res;
	}

	var subTest = new SubTest(testCollection);
	subTest.className = "MathPowerOfTest";	
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length; i++){
			res = powerOf(testCollection.numbers[i], (i%(testCollection.numbers.length/2000)+1));
		}
	}
	return subTest;
}

var MathPowerOfTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathPowerOfTestApi";	
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length; i++){
			res = Math.pow(testCollection.numbers[i], (i%(testCollection.numbers.length/2000)+1));
		}
	}
	return subTest;
}

var MathSqrtTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathSqrtTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length; i++){
			res = Math.sqrt(testCollection.numbers[i]);
		}
	}
	return subTest;
}

var MathSubtractionTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "MathSubtractionTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.numbers.length-1; i++){
			res = testCollection.numbers[i] - testCollection.numbers[i+1];
		}
	}
	return subTest;
}