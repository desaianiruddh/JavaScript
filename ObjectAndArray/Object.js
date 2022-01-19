let a=document.getElementById('show-obj');

// initialize object 
let person={
    name : 'Abc',  // property : value
    surname : 'Def',
    age : 21
}

//access object property using dot operator
let Sname=person.surname;
a.textContent = person.name +" "+Sname;

//add property outside from object 
person.employee=true;
console.log(person.employee);

// display object
console.log(Object.values(person));
console.log(JSON.stringify(person));

// we can pass function as value inside object 
let room={
    length : "32 inch",
    width : "45 inch",
    shoInfo : function(){
        // this mean current object
        console.log("Room is "+this.length+" long and "+this.width+" wide"); 
    }

}
// call function of object 
room.shoInfo();

function changeVal(obj){
    obj.length="50 inch"; //change property value of obj object
    obj.width="40 inch";
}

// passing object in function 
changeVal(room);
/* if we are passing object in function it pass by refrence so 
all the change occur directly impact on root object */
console.log("Room is "+room.length+" long and "+room.width+" wide");

// built-in object 
let date=new Date();
console.log(date.toString());

let x=225;
x=Math.sqrt(x);
console.log(x);

x=Math.random(x);
console.log(x);