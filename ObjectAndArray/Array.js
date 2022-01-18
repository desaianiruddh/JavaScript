let arrShow=document.getElementById('show-array');

//Initialize aray
let a=['a','b','c','d','e','f'];

// display array 
arrShow.innerHTML='Array A : '+a;
console.log(a);

//access particular element of array
console.log(a[1]);
console.log(a[4]);

// length of an array 
console.log("Length of Array A : "+a.length);

// recognize array
console.log(Array.isArray(a));
console.log(a instanceof Array);

//convert array into string
let y=a;
console.log(y.toString());
// string separator
console.log(y.join('-'));

//remove last elements of array using pop
let x=a.pop();
console.log('Array a: '+a+' & Pop Element is : '+x);

//add element using push
a.push('f');
console.log('(Push F) Array a : '+a);

//removes the first array element and "shifts" all other elements to a lower index.
a.shift();
console.log('(shift) Array a : '+a);

//adds a new element to an array (at the beginning)
a.unshift('a');
console.log('(unshift) Array a : '+a);

//delete element
delete a[3];
console.log('after delete a : '+a);
a[3]='d';

//merging array
let b=['g','h','i','j'];
let c=a.concat(b);
console.log('merged array c : '+c);

// add element at particular index using splice 
c.splice(5,0,'splice1','splice2');
//parameter 1 : Where to add
//how many elements want to remove
//rest parameter will be add as element in array
console.log('splice '+c);
//remove elements using splice
c.splice(5,2);
console.log('remove elements using splice '+c);

//remove some elememts from array and return sub-array
let p=c.slice(4);
let q=c.slice(2,6);
console.log('sliced array p: '+p+' q: '+q);

//sort alphabetical aray
let birds=['crow','humming-bird','peacock','hen','cock'];
birds.sort();
console.log('sorted array : '+birds);
//numeric array but it'll compare first letter so here 10<8
let num=['3','8','10','50','64','84','65','1','6','35'];
num.sort();
console.log('sorted array : '+num);
//for numeric array we need use sort like below
num.sort(function(a, b){return a-b });
console.log('sorted array : '+num);