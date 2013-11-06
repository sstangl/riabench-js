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
var ArrayTestCollection = function(testController){

	var copyArray = function(arr){
		var res = new Array();
		for (var i=0; i<arr.length; i++){
			res.push(arr[i])
		}
		return res;
	}

	var testCollection = new TestCollection(testController);
	testCollection.className = "ArrayTestCollection";

	d(testCollection.className, "Loading new tests into " + testCollection.className);
	
	testCollection.addSubTest(new ArrayIndexOfTest(testCollection));
	testCollection.addSubTest(new ArrayItemAtTest(testCollection));
	testCollection.addSubTest(new ArraySubArrayTest(testCollection));
	testCollection.addSubTest(new ArraySubArrayTestApi(testCollection));
	var array_copy1 = copyArray(testCollection.input_arr);
	testCollection.addSubTest(new ArrayPopTest(testCollection, array_copy1));

	d(testCollection.className, "All subTests were loaded");

	return testCollection;
}

/**
 * Extends SubTest
 */
var ArrayIndexOfTest = function(testCollection){
	
	var indexOf = function(arr, c){
		for (var j = 0; j < arr.length; j++) {
			if (testCollection.input_arr[j] == c) {
				return j;
			}
		}
	}
	
	var subTest = new SubTest(testCollection);
	subTest.className = "ArrayIndexOfTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 0; i < testCollection.alphabet.length; i++) {
			res = indexOf(testCollection.input_arr, testCollection.alphabet[i])
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var ArrayItemAtTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "ArrayItemAtTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 0; i < testCollection.input_arr.length; i++) {
				res = testCollection.input_arr[i];
			}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var ArrayPopTest = function(testCollection, inputArray){
	var subTest = new SubTest(testCollection);
	subTest.className = "ArrayPopTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 0; i < inputArray.length; i++) {
			res = inputArray[inputArray.length-i-1];
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var ArrayPopTestApi = function(testCollection, inputArray){
	var subTest = new SubTest(testCollection);
	subTest.className = "ArrayPopTestApi";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 0; i < inputArray.length; i++) {
			res = inputArray.pop();
		}
	}
	return subTest;
}

var ArraySubArrayTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "ArraySubArrayTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 100; i < testCollection.input_arr.length; i = i + 100) {
			res = testCollection.input_arr.slice(i - 100, i);
		}
	}
	return subTest;
}

var ArraySubArrayTest = function(testCollection){
	
	var slice = function(array, from, dest) {
		var res = new Array();
		
		for (var i = from; i < dest; i++) {
			res.push(array[i]);
		}
		return res;
	}
	
	var subTest = new SubTest(testCollection);
	subTest.className = "ArraySubArrayTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 100; i < testCollection.input_arr.length; i = i + 100) {
			res = slice(testCollection.input_arr, i-100, i);
		}
	}
	return subTest;
}

var ArraySubArrayTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "ArraySubArrayTestApi";
	subTest.startAlgorithm = function(){
		var res;
		for (var i = 100; i < testCollection.input_arr.length; i = i + 100) {
			res = testCollection.input_arr.slice(i - 100, i);
		}
	}
	return subTest;
}