//string padding
let str = "ani";
str = str.padStart(5, '-'); //add padding at beginning
console.log("Padding Start : " + str);
str = str.padEnd(9, '-'); //add padding at end
console.log("Padding End : " + str);
//es6 object
const obj = { name: 'Ani', city: 'surat', age: '32' };
//object.entries
let entries = Object.entries(obj);
console.log("Object.entries : " + entries);
//use for loop for display array
let txt = ""
for (const [prop, val] of entries) {
	txt += "\n" + prop + " : " + val;
}
console.log("Entries (For of loop) : " + txt);
//object.values
console.log("Object.values : " + Object.values(obj));
//Async Function