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
var StringTestCollection = function(testController){

	var testCollection = new TestCollection(testController);
	testCollection.className = "StringTestCollection";

	d(testCollection.className, "Loading new tests into " + testCollection.className);
	
	testCollection.addSubTest(new StringCharAtTest(testCollection));
	testCollection.addSubTest(new StringConcatTest(testCollection));
	testCollection.addSubTest(new StringConcatTestApi(testCollection));
	testCollection.addSubTest(new StringConcatTestBuffer(testCollection));
	testCollection.addSubTest(new StringConcatSingleTest(testCollection));
	testCollection.addSubTest(new StringConcatSingleTestApi(testCollection));
	testCollection.addSubTest(new StringConcatSingleTestBuffer(testCollection));
	testCollection.addSubTest(new StringGuiPushTest(testCollection));
	testCollection.addSubTest(new StringIndexOfTest(testCollection));
	testCollection.addSubTest(new StringIndexOfTestApi(testCollection));
	testCollection.addSubTest(new StringSubstrTest(testCollection));
	testCollection.addSubTest(new StringSubstrTestApi(testCollection));

	d(testCollection.className, "All subTests were loaded");

	return testCollection;
}

/**
 * Extends SubTest
 */
var StringCharAtTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "StringCharAtTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.input_str.length; i++){
			res = testCollection.input_str.charAt(i);
		}
	}
	return subTest;
}

var StringConcatTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatTest";
	subTest.startAlgorithm = function(){
		for (var i=10; i<testCollection.input_str.length-10; i=i+10){
			tmp += testCollection.input_str.substring(i-10, i);
		}
	}
	return subTest;
}

var StringConcatTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatTestApi";
	subTest.startAlgorithm = function(){
		for (var i=10; i<testCollection.input_str.length-10; i=i+10){
			tmp = tmp.concat(testCollection.input_str.substring(i-10, i));
		}
	}
	return subTest;
}

var StringConcatTestBuffer = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatTestBuffer";
	subTest.startAlgorithm = function(){
		var buf = new StringBuffer();
		for (var i=10; i<testCollection.input_str.length-10; i=i+10){
			buf.push(testCollection.input_str.substring(i-10, i));
		}
		var res = buf.getString();
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringConcatSingleTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatSingleTest";
	subTest.startAlgorithm = function(){
		for (var i=0; i<testCollection.input_str.length-10; i=i+10){
			tmp += testCollection.input_str.charAt(i);
		}
	}
	return subTest;
}

var StringConcatSingleTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatSingleTestApi";
	subTest.startAlgorithm = function(){
		for (var i=0; i<testCollection.input_str.length-10; i=i+10){
			tmp = tmp.concat(testCollection.input_str.charAt(i));
		}
	}
	return subTest;
}

var StringConcatSingleTestBuffer = function(testCollection){
	var subTest = new SubTest(testCollection);
	var tmp = "";
	subTest.className = "StringConcatSingleTestBuffer";
	subTest.startAlgorithm = function(){
		var buf = new StringBuffer();
		for (var i=0; i<testCollection.input_str.length-10; i=i+10){
			buf.push(testCollection.input_str.charAt(i));
		}
		var res = buf.getString();
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringGuiPushTest = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "StringGuiPushTest";
	subTest.startAlgorithm = function(){
		for (var i=0; i<(testCollection.input_str.length/50); i++){
			testCollection.myspan.innerHTML += testCollection.input_str.charAt(i);
		}
		testCollection.myspan.innerHTML = "";
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringIndexOfTest = function(testCollection){
	
	var indexOf = function(c, str){
		for (var i=0; i<str.length; i++){
			if (str.charAt(i) == c){
				return i;
			}
		}
		return -1;
	}
	
	var subTest = new SubTest(testCollection);
	subTest.className = "StringIndexOfTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.alphabet.length; i++){
			res = indexOf(testCollection.alphabet[i], testCollection.input_str);
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringIndexOfTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "StringIndexOfTestApi";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=0; i<testCollection.alphabet.length; i++){
			res = testCollection.input_str.indexOf(testCollection.alphabet[i]);
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringSubstrTest = function(testCollection){
	
	var substring = function(str, from, dest){
		var res = "";
		for (var i = from; i <= dest; i++) {
			res = res.concat(str.charAt(i));
		}
		return res;
	}
	
	var subTest = new SubTest(testCollection);
	subTest.className = "StringSubstrTest";
	subTest.startAlgorithm = function(){
		var res;
		for (var i=2; i<testCollection.input_str.length; i=i+2){
			res = substring(testCollection.input_str, i-2, i)
		}
	}
	return subTest;
}

/**
 * Extends SubTest
 */
var StringSubstrTestApi = function(testCollection){
	var subTest = new SubTest(testCollection);
	subTest.className = "StringSubstrTestApi";
	subTest.startAlgorithm = function(){
		var res = "";
		for (var i=2; i<testCollection.input_str.length; i=i+2){
			res = testCollection.input_str.substring(i-2, i);
		}
	}
	return subTest;
}

var StringBuffer = function(){
	this.push = function(str){
		_buf.push(str);
	}
	
	this.getString = function(){
		return _buf.join("");
	}
	
	var _buf = new Array();
}