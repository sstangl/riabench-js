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
var RelationalOperatorTestCollection = function(testController){

	var testCollection = new TestCollection(testController);
	testCollection.className = "RelationalOperatorTestCollection";

	d(testCollection.className, "Loading new tests into " + testCollection.className);
	
	testCollection.addSubTest(new BiggerThanTest(testCollection));
	testCollection.addSubTest(new EqualToTest(testCollection));
	testCollection.addSubTest(new SmallerThanTest(testCollection));

	d(testCollection.className, "All subTests were loaded");

	return testCollection;
}

/**
 * Extends SubTest
 */
var BiggerThanTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "BiggerThanTest";
	subTest.startAlgorithm = function(){
		for (var i=0; i<testCollection.bitstream.length-1; i++){
			if (testCollection.bitstream[i] > testCollection.bitstream[i+1]){}
			else{}
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var EqualToTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "EqualToTest";
	subTest.startAlgorithm = function(){
		for (var i=0; i<testCollection.bitstream.length-1; i++){
			if (testCollection.bitstream[i] == testCollection.bitstream[i+1]){}
			else{}
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var SmallerThanTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "SmallerThanTest";
	subTest.startAlgorithm = function(){
		for (var i=0; i<testCollection.bitstream.length-1; i++){
			if (testCollection.bitstream[i] < testCollection.bitstream[i+1]){}
			else{}
		}
	}
	return subTest;
}