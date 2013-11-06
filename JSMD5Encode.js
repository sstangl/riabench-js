/*
	Copyright (c) 2010 Timo Ernst - http://www.timo-ernst.net

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var startTime;
var stopTime;
var textBox;

function JSMD5Encode(){
 	textBox = document.getElementById("mytext");
	setTimeout("startHashing()", 1000);
}

function startHashing(){
	var data = (document.getElementById("inputData")).innerHTML;
	startTime = new Date();

	var hash = $.md5(data);
	stopTime = new Date();
	
	var timeElapsed = stopTime.getTime() - startTime.getTime();
	textBox.innerHTML = "Done! Time elapsed: " + timeElapsed + " ms ";
}