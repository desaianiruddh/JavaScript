// Arrow function
const sum = (a, b) => {
	console.log("a + b = " + (a + b));
}
sum(5, 7);
// Default Arguments
const sums = (a = 1, b = 1) => a + b;
console.log("Default Argu. : " + sums());
console.log("Default Argu. : " + sums(3, 5));
//template string
const length = 5,
	width = 10;
subStr1 = `Room length is ${length} and width is ${width}`; //use backtick instead inverted coma
console.log('variable in string :' + subStr1);
//Object Destructing
const person = {
	firstName: 'Ani',
	city: 'surat',
	age: '32'
};
const { firstName, city, age } = person;
console.log(firstName);
console.log(city);
console.log(age);
//copy the person one property and value in person2
const person2 = { firstName, city, age }; //object property method
console.log("Person 2 : " + person2);
//Array Destructing
const arr = ['ani', 'mahesh', 'urvish', 'bhautik', 'hardik'];
console.log("Array : " + arr);
const [name1, name2, name3, name4, name5] = arr;
console.log(name1);
console.log(name2);
console.log(name3);
console.log(name4);
console.log(name5);