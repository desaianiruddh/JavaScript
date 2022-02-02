const display = document.getElementById('display');
const number = document.querySelectorAll('.number');
const allBtn = document.querySelectorAll('.btn');
const operation = document.querySelectorAll('.operation');
const clearDisplay = document.querySelectorAll('.clear');
const trigonometry = document.querySelectorAll('.trigonometry');
const degreeBtn = document.querySelector('.degreeBtn');
const classFE = document.querySelector('.classFE');
const mathFunction = document.querySelectorAll('.mathFunction');
const secondElement = document.querySelector('.secondElement');
const firstList = document.querySelectorAll('.firstList');
const memoryFunction = document.querySelectorAll('.memoryFunction');
const disabledBtn = document.querySelectorAll('.disabledBtn');
const equalBtn = document.querySelector('.equal');
display.innerText = '0';

let result;
let displayText = '';
let lastElements = '';
let tempNum = '';
let deg = true;
let havedot = false;
let isFE = false;
let operationState = true;
let tempOpearationState = true;
let isMultiplication = false;
let isDivision = false;
let isMod = false;
let isExp = false;
let plusMinus = [];
let memory = [];
let isTrigometry = false;
let isInverseTrigonometry = false;
let mathOperation = false;
let isSecondList = false;
let isCombination = false;
let isPower = false;
let counter = 0;
let bracketStartIndex, bracketEndIndex;
changeList();
//alert function
function alertMsg(msg) {
  alert(msg);
}
//click number
number.forEach(number => {
  number.addEventListener('click', (e) => {
    //check for multiple dot
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
    else if (isTrigometry) {
      display.innerText = isTrigometry + '(' + displayText + ')';
    }
    else if (mathOperation) {
      display.innerText = mathOperation + '(' + displayText + ')';
    }
    else if (isCombination) {
      display.innerText = tempNum + 'C' + displayText;
    }
    else if (isPower) {
      display.innerText = tempNum + '^' + displayText;
    }
    else {
      display.innerText = displayText;
    }
  })
})
//clear all state and variables
function clearVar() {
  displayText = lastElements = '';
  havedot = isMultiplication = isDivision = isTrigometry = mathOperation = isFE = false;
  counter = 0;
  isPower = isMod = isExp = isCombination = isInverseTrigonometry = false;
  result = null;
  operationState = true;
  plusMinus = plusMinus.slice(0, 0);

}
//clear display button click
clearDisplay.forEach(clr => {
  clr.addEventListener('click', (e) => {
    if (e.target.innerText === 'C') {
      clearVar();
      display.innerText = '0';
      disabledBtn.forEach(btn => {
        btn.classList.add('disabled');
      })
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
      else if (isTrigometry) {
        if (displayText[displayText.length - 1] === '.') havedot = false;
        displayText = displayText.substring(0, displayText.length - 1);
        display.innerText = isTrigometry + '(' + displayText + ')';
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
      checkPriority();
      isMultiplication = isDivision = isMod = isExp = false;
    }
    else if (e === 'x' || e === '÷') {
      checkPriority();
      e === 'x' ? isMultiplication = true : isDivision = true;
      isMod = isExp = false;
    }
    else if (e === 'n!') {
      displayText = parseFloat(displayText);
    }
    else if (e === 'mod') {
      if (!displayText) {
        alert('Enter first Element for mod')
        return;
      }
      else {
        checkPriority();
        e === 'mod' ? isMod = true : isMod = false;
      }
    }
    else if (e === 'exp') {
      if (!displayText) {
        displayText = 1;
      }
      checkPriority();
      e === 'exp' ? isExp = true : isExp = false;
    }
    else if (e === '|x|') {
      e = '|';
      let total = 0;
      if (counter === 0) {
        bracketStartIndex = plusMinus.length;
        counter++;
      }
      else {
        checkPriority();
        bracketEndIndex = plusMinus.length - 1;
        let diff = bracketEndIndex - bracketStartIndex;
        for (let k = 0; k <= diff; k++) {
          total += plusMinus[bracketEndIndex];
          console.log('element ans of mod>> ' + total);
          plusMinus.pop();
          bracketEndIndex--;
        }
        plusMinus.push(Math.abs(total));
        counter = 0;
      }
    }
    else if (e === '(' || e === ')') {
      let total = 0;
      if (e === '(') {
        bracketStartIndex = plusMinus.length;
        counter++;
      }
      else {
        checkPriority();
        bracketEndIndex = plusMinus.length - 1;
        let diff = bracketEndIndex - bracketStartIndex;
        for (let k = 0; k <= diff; k++) {
          total += plusMinus[bracketEndIndex];
          console.log('element ans of bracket>> ' + total);
          plusMinus.pop();
          bracketEndIndex--;
        }
        plusMinus.push(parseFloat(total));
      }
    }

    e === '-' ? operationState = false : operationState = true;
    lastElements += displayText.toString();
    lastElements += e;
    display.innerText = lastElements;
    displayText = '';
    havedot = false;
  })
})
//check priority
function checkPriority() {
  operationState ? plusMinus.push(parseFloat(displayText)) : plusMinus.push((-1) * parseFloat(displayText));
  if (isMod) mod();
  if (isExp) exp();
  if (isMultiplication) multiplication();
  if (isDivision) division();
}
//multiplication and division function
function multiplication() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("multiply>> " + plusMinus); // multiply>> answer
  isMultiplication = false;
}
function division() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] / plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("div>> " + plusMinus); // div>> answer 
  isDivision = false;
}
function mod() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] % plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("mod>> " + plusMinus); // mod>> answer
  isMod = false;
}
function exp() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * (10 ** plusMinus[len]);
  plusMinus = plusMinus.slice(0, len);
  console.log("mod>> " + plusMinus); // epx>> answer
  isExp = false;
}
//trigonometry
trigonometry.forEach(trigonometry => {
  trigonometry.addEventListener('click', (e) => {
    e = e.target.innerText;
    clearVar();
    isTrigometry = e;
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
function evalTrigonometry(functionName, degree) {
  //for inverse trigonometry
  if (isInverseTrigonometry && (functionName === 'sinh' || functionName === 'cosh')) {
    isInverseTrigonometry = false;
    switch (functionName) {
      case 'sinh':
        return Math.sinh(degree);
        break;
      case 'cosh':
        return Math.cosh(degree);
        break;
    }
  }
  else if (isInverseTrigonometry) {
    switch (functionName) {
      case 'sin-1':
        return Math.asin(degree);
        break;
      case 'cos-1':
        return Math.acos(degree);
        break;
      case 'tan-1':
        return Math.atan(degree);
        break;
    }
  }
  else {
    deg ? degree = degree * Math.PI / 180 : degree = degree;
    switch (functionName) {
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
}
//mathFunction add text
mathFunction.forEach(mathFunction => {
  mathFunction.addEventListener('click', (e) => {
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
function mathOp(operationName, num) {
  switch (operationName) {
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
    case 'log':
      return Math.log10(num).toFixed(4);
      break;
    case 'ln':
      return Math.log(num).toFixed(4);
      break;
  }
}
//factorial
function fact(num) {
  let n;
  num ? n = parseFloat(num) : n = parseFloat(displayText);
  let answer = 1;
  if (n == 0 || n == 1) {
    return;
  }
  else {
    for (var i = n; i >= 1; i--) {
      answer = answer * i;
    }
    if (num) {
      return answer;
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
function inverseNum() {
  displayText = parseFloat(displayText) ** (-1);
  displayText = displayText.toFixed(2);
  display.innerText = lastElements + displayText.toString();
}
//change first list to second list
function changeList() {
  if (isSecondList) {
    firstList.forEach(fList => {
      ele = fList.value;
      switch (ele) {
        case 'element1':
          fList.innerHTML = 'sin<sup>-1</sup>';
          break;
        case 'element2':
          fList.innerHTML = 'cos<sup>-1</sup>';
          break;
        case 'element3':
          fList.innerHTML = 'tan<sup>-1</sup>';
          break;
        case 'element4':
          fList.innerHTML = 'sinh';
          break;
        case 'element5':
          fList.innerHTML = 'cosh';
          break;
        case 'element6':
          fList.innerHTML = 'nCr';
          break;
      }
    })
    secondElement.innerHTML = '1<sup>st</sup>';
    isSecondList = false;
  }
  else {
    firstList.forEach(fList => {
      ele = fList.value;
      switch (ele) {
        case 'element1':
          fList.innerHTML = 'x<sup>2</sup>';
          break;
        case 'element2':
          fList.innerHTML = '<img src="./buttonPng/sqrt.png" alt="sqrt">';
          break;
        case 'element3':
          fList.innerHTML = 'x<sup>y</sup>';
          break;
        case 'element4':
          fList.innerHTML = '10<sup>x</sup>';
          break;
        case 'element5':
          fList.innerHTML = 'log';
          break;
        case 'element6':
          fList.innerHTML = 'ln';
          break;
      }
    })
    secondElement.innerHTML = '2<sup>nd</sup>';
    isSecondList = true;
  }
}
//eval list elements
firstList.forEach(list => {
  list.addEventListener('click', e => {
    listTxt = e.target.innerText;
    listVal = e.target.value;
    if (!isSecondList) {
      secondListClick(listTxt, listVal);
    }
    else {
      firstListClick(listTxt, listVal);
    }
  })
})
//eval first list
function firstListClick(functionName, elementVal) {
  switch (elementVal) {
    case 'element1':
      if (!displayText) {
        alertMsg('Add Value For Square');
      }
      else {
        displayText = parseFloat(displayText) ** 2;
        display.innerText = displayText.toString();
      }
      break;
    case 'element2':
      if (!displayText) {
        alertMsg('Add Value For Square Root');
      }
      else {
        displayText = parseFloat(displayText) ** (1 / 2);
        display.innerText = displayText.toString();
      }
      break;
    case 'element3':
      if (!displayText) {
        alertMsg('Add Value X for X^y');
      }
      else {
        isPower = true;
        tempNum = displayText;
        display.innerText = tempNum + '^';
        displayText = '';
      }
      break;
    case 'element4':
      if (!displayText) {
        alertMsg('Add Value of 10s exponent');
      }
      else {
        displayText = 10 ** parseFloat(displayText);
        display.innerText = displayText.toString();
      }
      break;
    case 'element5':
      display.innerText = functionName + '()';
      mathOperation = functionName;
      break;
    case 'element6':
      display.innerText = functionName + '()';
      mathOperation = functionName;
      break;
  }
}
//eval secondList
function secondListClick(functionName, elementVal) {
  if (elementVal === 'element6') {
    if (!displayText) {
      alertMsg('Add Value of n for nCr');
    }
    else {
      isCombination = true;
      tempNum = displayText;
      display.innerText = displayText + 'C';
      displayText = '';
    }
  }
  else {
    clearVar();
    isInverseTrigonometry = true;
    isTrigometry = functionName;
    display.innerText = functionName + '()';
  }
}
//memory function
memoryFunction.forEach(memoryFunction => {
  memoryFunction.addEventListener('click', e => {
    e = e.target.innerText;
    if (e === 'M+' || e === 'M-' || e === 'MS') {
      disabledBtn.forEach(btn => {
        btn.classList.remove('disabled');
      })
    }
    else {
      disabledBtn.forEach(btn => {
        btn.classList.add('disabled');
      })
    }
    switch (e) {
      case 'M+':
        memory.push(parseFloat(displayText));
        break;
      case 'M-':
        memory.push((-1) * parseFloat(displayText));
        break;
      case 'MS':
        memory.push(parseFloat(displayText));
        break;
      case 'MC':
        for (let i = 0; i < memory.length; i++) {
          memory.pop();
        }
        break;
      case 'MR':
        memory = memory.reduce((sum, cur) => {
          sum += cur;
          return sum;
        }, 0);
        display.innerText = memory;
        break;
    }
  })
})
//if there's need of two argument from user
function twoArgueFromUser(x, y, functionName) {
  let ans;
  switch (functionName) {
    case 'nCr':
      ans = fact(x) / fact(x - y) / fact(y);
      return ans;
      break;
    case 'power':
      return x ** y;
      break;
  }

}
//eval final answer
function equal() {
  if (isPower) {
    result = twoArgueFromUser(parseFloat(tempNum), parseFloat(displayText), 'power');
  }
  else if (isCombination) {
    let r = parseFloat(displayText);
    let n = parseFloat(tempNum);
    if (r > n) {
      alertMsg('r should smaller than n');
      result = 0;
    }
    else if (r === 1 || r === n - 1) {
      result = n;
    }
    else if (r === 0 || r === n) {
      result = 1;
    }
    else {
      result = twoArgueFromUser(n, r, 'nCr');
    }
  }
  else if (isTrigometry) {
    let ans = evalTrigonometry(isTrigometry, parseFloat(displayText));
    !isInverseTrigonometry ? result = ans : result = ans * (180 / Math.PI);
    result = result.toFixed(2);
  }
  else if (mathOperation) {
    let ans = mathOp(mathOperation, parseFloat(displayText));
    result = ans.toFixed(6);
  }
  else if (plusMinus[0]) {
    displayText ? displayText : displayText = 0;
    checkPriority();
    operationState = true;
    let sum = 0;
    for (let el of plusMinus) {
      sum += el
    }
    console.log('ans >>' + sum);
    result = sum;
    console.log('equal' + plusMinus);
    //if F-E is true
    if (isFE) {
      result = 10 ** result;
    }
  }
  else {
    result = displayText;
  }
  display.innerText = result;
  let tempAns = result;
  clearVar();
  displayText = tempAns.toString();
}
//input from keyboard
window.addEventListener('keydown', e => {
  e = e.key;
  //for number
  if (
    e === '0' ||
    e === '1' ||
    e === '2' ||
    e === '3' ||
    e === '4' ||
    e === '5' ||
    e === '6' ||
    e === '7' ||
    e === '8' ||
    e === '9' ||
    e === '.'
  ) {
    clickNumButton(e);
  }
  //for operator
  else if (
    e === '+' ||
    e === '-' ||
    e === '*' ||
    e === '/' ||
    e === '(' ||
    e === ')' ||
    e === '%'
  ) {
    if (e === '*') {
      clickOperationButton('x');
    }
    else if (e === '/') {
      clickOperationButton('÷');
    }
    else if (e === '%') {
      clickOperationButton('mod');
    }
    else {
      clickOperationButton(e);
    }
  }
  //clearAll and backspace
  else if (e === 'Delete' || e === 'Backspace') {
    e === 'Delete' ? clickClearAll('clearAll') : clickClearAll(e);
  }
  //enter or equal
  else if (e === 'Enter' || e === '=') {
    clickEqual();
  }
})
//number click function
function clickNumButton(key) {
  number.forEach(btn => {
    if (btn.innerText === key) {
      btn.click()
    }
  })
}
//operator click function
function clickOperationButton(key) {
  operation.forEach(btn => {
    if (btn.innerText === key) {
      btn.click();
    }
  })
}
//click clear
function clickClearAll(key) {
  clearDisplay.forEach(btn => {
    if (btn.value === key) {
      btn.click();
    }
  })
}
//click enter or equal
function clickEqual() {
  equalBtn.click();
}