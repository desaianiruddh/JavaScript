//variable hoisting
console.log('I am ' + jobName); //undefined
var jobName = 'Web-Developer';
console.log('I am ' + jobName);
//same name variable inside function
function job() {
	console.log('I am ' + jobName); //undefined even we have global variable
	var jobName = 'Data-analyst';   //will be declare as function scope
	console.log('I am ' + jobName);
}
//call job() for output
job();
//function hoisting
//can use function before initialization
sum(5, 7);
function sum(a, b) {
	console.log('sum ' + (a + b));
}
/* In function expression,fat arrow function,const and let
	 hoisting is not working and throw error	*/
multiply(2, 3);
var multiply = function (a, b) {
	console.log('sum ' + (a * b));
}