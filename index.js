const display = document.getElementById('display');
const number = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const clearDisplay = document.querySelectorAll('.clear');
const trigonometry = document.querySelectorAll('.trigonometry');
const degreeBtn = document.querySelector('.degreeBtn');
const classFE = document.querySelector('.classFE');
const mathFunction = document.querySelectorAll('.mathFunction');
// const equal=document.querySelector('.equal');
display.innerText = '0';

let result = null;
let displayText = '';
let lastElements = '';
let deg = true;
let havedot = false;
let isFE = false;
let operationState = true;
let isMultiplication = false;
let isDivision = false;
let plusMinus = [];
let isTrigo = false;
let mathOperation = false;
//click number
number.forEach(number => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !havedot) {
      havedot = true;
    }
    else if (e.target.innerText === '.' && havedot) return;
    displayText += e.target.innerText;
    if (lastElements) {
      let temp = lastElements + displayText;
      display.innerText = temp;
      // display.innerText=lastElements;
    }
    else {
      display.innerText = displayText;
    }
    if (isTrigo) {
      display.innerText = isTrigo + '(' + displayText + ')';
    }
    else if (mathOperation) {
      display.innerText = mathOperation + '(' + displayText + ')';
    }
  })
})
//clear display
function clearVar() {
  displayText = '';
  lastElements = '';
  havedot = false;
  result = null;
  operationState = true;
  isMultiplication = false;
  isDivision = false;
  isTrigo = false;
  mathOperation = false;
  isFE = false;
  plusMinus = plusMinus.slice(0, 0);
}
clearDisplay.forEach(clr => {
  clr.addEventListener('click', (e) => {
    if (e.target.innerText === 'C') {
      clearVar();
      display.innerText = '0'
    }
    else {

      if (lastElements) {
        lastElements += displayText;
        let i = lastElements.length - 1;
        if (lastElements[i] === '+' || lastElements[i] === '-') plusMinus.pop();
        lastElements = lastElements.substring(0, i);
        display.innerText = lastElements;
        lastElements = displayText;
      }
      //if there's trigonometry function
      else if (isTrigo) {
        if (displayText[displayText.length - 1] === '.') havedot = false;
        displayText = displayText.substring(0, displayText.length - 1);
        display.innerText = isTrigo + '(' + displayText + ')';
      }
      else if (mathOperation) {
        if (displayText[displayText.length - 1] === '.') havedot = false;
        displayText = displayText.substring(0, displayText.length - 1);
        display.innerText = mathOperation + '(' + displayText + ')';
      }
      else {
        if (displayText[displayText.length - 1] === '.') havedot = false;
        displayText = displayText.substring(0, displayText.length - 1);
        if (!displayText) display.innerText = 0;
        else display.innerText = displayText;
      }
    }
  })
})
//plus or minus
function plusOrMinus() {
  if (mathOperation) {
    display.innerText = mathOperation + '(-' + displayText + ')';
    displayText = ((-1) * parseFloat(displayText)).toString();
  }
  else if (displayText) {
    operationState ? operationState = false : operationState = true;
    lastElements = lastElements + '-' + displayText;
    // display.innerText = lastElements?lastElements+'-'+displayText:'-'+displayText;
    display.innerText = lastElements;

  }
}
//set FE state and button
function setFE() {
  if (isFE) {
    classFE.classList.remove('btn-dark');
    isFE = false;
  }
  else {
    classFE.classList.add('btn-dark');
    isFE = true;
  }
}
//operation
operation.forEach(operation => {
  operation.addEventListener('click', (e) => {
    e = e.target.innerText;
    if (e === '+' || e === '-') {
      operationState ? plusMinus.push(parseFloat(displayText)) : plusMinus.push((-1) * parseFloat(displayText));
      if (isMultiplication) multiplication();
      if (isDivision) division();
      isMultiplication = isDivision = false;
    }
    else if (e === 'x' || e === '÷') {
      operationState ? plusMinus.push(parseFloat(displayText)) : plusMinus.push((-1) * parseFloat(displayText));
      if (isMultiplication) multiplication();
      if (isDivision) division();
      e === 'x' ? isMultiplication = true : isDivision = true;
    }
    else if (e === 'n!') {
      displayText = parseFloat(displayText);
    }



    e === '-' ? operationState = false : operationState = true;
    lastElements += displayText.toString();
    lastElements += e;
    display.innerText = lastElements;
    displayText = '';
    havedot = false;
  })
})
//multiplication and division function
function multiplication() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("multi" + plusMinus);
  isMultiplication = false;
}
function division() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] / plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("multi" + plusMinus);
  isDivision = false;
}


//trigonometry
trigonometry.forEach(trigonometry => {
  trigonometry.addEventListener('click', (e) => {
    e = e.target.innerText;
    clearVar();
    isTrigo = e;
    display.innerText = e + '()';
  })
})
//degree status
function setDegree() {
  e = degreeBtn.innerText;
  if (deg) {
    degreeBtn.innerText = 'RAD'
    deg = false;
  }
  else {
    degreeBtn.innerText = 'DEG';
    deg = true;
  }
}
//trigonometry function
function trigo(func, degree) {
  deg ? degree = degree * Math.PI / 180 : degree = degree;
  switch (func) {
    case 'sin':
      return Math.sin(degree);
      break;
    case 'cos':
      return Math.cos(degree);
      break;
    case 'tan':
      return Math.tan(degree);
      break;
    case 'cosec':
      return 1 / Math.sin(degree);
      break;
    case 'sec':
      return 1 / Math.cos(degree);
      break;
    case 'cot':
      return 1 / Math.tan(degree);
      break;
  }
}
//mathFunction add text
mathFunction.forEach(func => {
  func.addEventListener('click', (e) => {
    e = e.target.innerText;
    clearVar();
    if (e === 'rand') {
      displayText = Math.random().toFixed(5);
      display.innerText = displayText;
      displayText = '';
    }
    else {
      mathOperation = e;
      display.innerText = e + '()';
    }
  })
})
//maths function calculation
function mathOp(Op, num) {
  switch (Op) {
    case 'abs':
      return Math.abs(num);
      break;
    case 'ceil':
      return Math.ceil(num);
      break;
    case 'round':
      return Math.round(num);
      break;
    case 'cbrt':
      return Math.cbrt(num);
      break;
    case 'floor':
      return Math.floor(num);
      break;
  }
}
//factorial
function fact() {
  let n = parseFloat(displayText);
  let answer = 1;
  if (n == 0 || n == 1) {
    return;
  } else {
    for (var i = n; i >= 1; i--) {
      answer = answer * i;
    }
    displayText = answer.toString();
    display.innerText = lastElements + displayText;
  }
}
//mathPI
function mathPI() {
  displayText = (Math.PI).toFixed(4);
  displayText.toString();
  display.innerText = lastElements + 'π';
}
//mathE
function mathE() {
  displayText = (Math.E).toFixed(4);
  displayText.toString();
  display.innerText = lastElements + 'e';
}







function equal() {
  if (plusMinus[0]) {
    operationState ? plusMinus.push(parseFloat(displayText)) : plusMinus.push((-1) * parseFloat(displayText));
    if (isMultiplication) multiplication();
    if (isDivision) division();
    operationState = true;
    let sum = 0;
    for (let el of plusMinus) {
      sum += el
    }
    console.log(sum);
    result = sum;
    console.log("equal" + plusMinus);
  }
  if (isTrigo) {
    let ans = trigo(isTrigo, parseFloat(displayText));
    result = ans;
  }
  if (mathOperation) {
    let ans = mathOp(mathOperation, parseFloat(displayText));
    result = ans;
  }
  if (isFE) {
    result = 10 ** result;
  }

  display.innerText = result;
  clearVar();
}
