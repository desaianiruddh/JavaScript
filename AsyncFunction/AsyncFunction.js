
const time = document.getElementById('showTime');
//function call itteratively as per defined time interval
const intervalFunction = () => {
	const date = new Date();
	time.innerHTML = 'Interval Function : ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
setInterval(intervalFunction, 1000); //each second calling function
//After Defined Time Function will be called
setTimeout(function () { timeoutFunction('Timeout Function Call'); }, 2000); //function will call 
function timeoutFunction(value) {
	console.log(value);
}
//show first because setInterval and SetTimeout is Async. function
console.log('Me First'); //show first
const first = () => { console.log('first function') }
//big number of iteration loop for take more time
const second = () => {
	for (let i = 0; i < 200000001; i++) {
		if (i == 200000000) {
			console.log('second loop function');
		}
	}
}
setTimeout(() => {
	first()             //call first()
}, 0);
second();						 //call second()
console.log('last');