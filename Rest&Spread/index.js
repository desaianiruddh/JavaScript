//sum using rest parameter
const sum = (...num) => {
	let total = 0;
	for (const item of num) {
		total += item;
	}
	console.log(' Sum = ' + total)
}
//call function using finite argument
sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
//person details object
const person1 = {
	name: 'Aniruddh',
	sName: 'Desai',
	age: 21,
	city: 'Surat'
}
// can copy whole obj using spread operator
const person2 = {
	...person1
}
console.log('Spread Operator for Object : ' + JSON.stringify(person2));
//number array
const arr1 = [1, 2, 2, 4, 5, 8, 6, 4, 5, 3, 1, 8];
//copy array using spread operator
const arr2 = [...arr1];
console.log(arr2);