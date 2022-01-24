//IIFE
const counter = (function () {
  //intialise counter
  let count = 0;
  //print message and counter state
  function print(msg) {
    console.log(msg + ' >>> ' + count);
  }
  //increament counter to 1
  function increament() {
    count++;
    print('increament');
  }
  // get current state of counter
  function get() {
    print('get counter');
  }
  // set counter value
  function set(val) {
    count = val;
    print('set counter')
  }
  // resest function
  function reset() {
    count = 0;
    print('reset counter')
  }
  // object for each function
  return {
    getCount: get,
    setCount: set,
    increament: increament,
    resetCount: reset
  }
})();
//call the function as object property
counter.setCount(3); // counter 3
counter.increament();// counter 4
counter.getCount();// show counter state
counter.resetCount();// reset counter 0
counter.increament();// counter 1
counter.setCount(10);// counter 10
counter.getCount();// show counter state