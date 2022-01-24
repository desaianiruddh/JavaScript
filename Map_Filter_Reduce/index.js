const arr1 = [1, 5, 6, 8, 7, 6, 1, 2, 3, 5, 15, 6, 8, 7, 6, 1, 5, 6, 4, 18, 20];
//transformation of array using map
const double = arr1.map(doubleNum);
console.log('Multiplying Using Map: ' + double);
//function for multiply number
function doubleNum(x) {
  return x * 2;
}
//convert array to binary elements
const binary = arr1.map(x => x.toString(2));
console.log('Binary using Map: ' + binary);
//filter array
//sub array of even number
const evenNum = arr1.filter(x => x % 2 === 0);
console.log('Even elements: ' + evenNum);
//number is greater than 10
const greaterNum = arr1.filter(x => x > 10);
console.log('Number which is greater than 10: ' + greaterNum);
// sum of all element of array using redude 
const sum = arr1.reduce((total, current) => {
  total += current;
  return total;
}, 0);
console.log('sum using reduce: ' + sum);
//also we can use all the method for array of an object
const arrayOfObject = [
  { name: 'Ani', city: 'surat', age: 21 },
  { name: 'Sahil', city: 'junagadh', age: 35 },
  { name: 'Bhautik', city: 'ahmedabad', age: 70 },
  { name: 'Urvish', city: 'surat', age: 70 },
  { name: 'Mahesh', city: 'amreli', age: 21 }
]
//print all the name of person
const personName = arrayOfObject.map(x => x.name);
console.log(personName);
//name & city of person which greater age than 30
const greaterAge = arrayOfObject.filter(x => x.age > 30).map(x => `${x.name} from ${x.city}`);
console.log(greaterAge);
//age wise person count
var personCount = arrayOfObject.reduce((obj, currObj) => {
  !obj[currObj.age] ? obj[currObj.age] = 1 : obj[currObj.age]++;
  return obj;
}, {})
console.log(personCount);
