const display = document.getElementById('display');
const allBtn = document.querySelectorAll('.btn');
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operation');
const clearDisplay = document.querySelectorAll('.clear');
const trigonometry = document.querySelectorAll('.trigonometry');
const degreeBtn = document.querySelector('.degree-btn');
const clickFE = document.querySelector('.click-fe');
const mathFunction = document.querySelectorAll('.math-function');
const secondBtn = document.querySelector('.second-btn');
const firstList = document.querySelectorAll('.first-list');
const memoryFunction = document.querySelectorAll('.memory-function');
const disabledBtn = document.querySelectorAll('.disabled-btn');
const equalBtn = document.querySelector('.equal');
display.innerText = '0';
//all the state and variables
let result;
let currentText = '';
let lastElements = '';
let tempNum = '';
let deg = true;
let isDot = false;
let isFE = false;
let operationState = true, lastOpearationState = true;
let isMultiplication = false, lastMultiplication = false;
let isDivision = false, lastDivision = false;
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
let isBracket = false;
let bracketStartIndex, bracketEndIndex;
changeList();
//alert function
function alertMsg(msg) {
  alert(msg);
}
//clear all state and variables
function clearVar() {
  currentText = lastElements = tempNum = '';
  isDot = isMultiplication = isDivision = isTrigometry = mathOperation = isFE = false;
  isPower = isMod = isExp = isCombination = isInverseTrigonometry = isBracket = false;
  lastMultiplication = lastDivision = false;
  counter = 0;
  result = null;
  operationState = lastOpearationState = true;
  plusMinus = plusMinus.slice(0, 0);
}
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
//set FE state and button
function setFE() {
  if (isFE) {
    clickFE.classList.remove('btn-dark');
    isFE = false;
  }
  else {
    clickFE.classList.add('btn-dark');
    isFE = true;
  }
}
//memory function
memoryFunction.forEach(memoryFunction => {
  memoryFunction.addEventListener('click', e => {
    e = e.target.innerText;
    //set enable to disabled button
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
        memory.push(parseFloat(currentText));
        console.log('M+ >> ' + memory); //print added element
        break;
      case 'M-':
        memory.push((-1) * parseFloat(currentText));
        console.log('M- >> ' + memory); //print added element
        break;
      case 'MS':
        memory.push(parseFloat(currentText));
        console.log('MS >> ' + memory); //print added element
        break;
      case 'MC':
        for (let i = 0; i < memory.length; i++) {
          memory.pop();
        }
        memory[0] = 0;
        console.log('MC >> ' + memory);
        break;
      case 'MR':
        let total = memory.reduce((sum, cur) => {
          sum += cur;
          return sum;
        }, 0);
        display.innerText = total;
        console.log('MR >> ' + memory); //print added element
        break;
    }
  })
})
//click trigonometry
trigonometry.forEach(trigonometry => {
  trigonometry.addEventListener('click', (e) => {
    e = e.target.innerText;
    clearVar();
    isTrigometry = e;
    display.innerText = e + '()';
  })
})
//trigonometry function
function evalTrigonometry(functionName, degree) {
  //for inverse trigonometry and hyp function
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
      currentText = Math.random().toFixed(5);
      display.innerText = currentText;
      currentText = '';
    }
    else {
      mathOperation = e;
      display.innerText = e + '()';
    }
  })
})
//maths function calculation
function evalMathOperation(operationName, num) {
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
      return Math.log10(num);
      break;
    case 'ln':
      return Math.log(num);
      break;
  }
}
//change first list to second list
//and second list to first list
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
    secondBtn.innerHTML = '1<sup>st</sup>';
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
    secondBtn.innerHTML = '2<sup>nd</sup>';
    isSecondList = true;
  }
}
//get list elements and value
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
//eval first list element
function firstListClick(functionName, elementVal) {
  switch (elementVal) {
    case 'element1':
      if (!currentText) {
        alertMsg('Add Value For Square');
      }
      else {
        currentText = parseFloat(currentText) ** 2;
        display.innerText = currentText.toString();
      }
      break;
    case 'element2':
      if (!currentText) {
        alertMsg('Add Value For Square Root');
      }
      else {
        currentText = parseFloat(currentText) ** (1 / 2);
        currentText = currentText.toFixed(4);
        display.innerText = currentText.toString();
      }
      break;
    case 'element3':
      if (!currentText) {
        alertMsg('Add Value X for X^y');
      }
      else {
        isPower = true;
        tempNum = currentText;
        display.innerText = tempNum + '^';
        currentText = '';
      }
      break;
    case 'element4':
      if (!currentText) {
        alertMsg('Add Value of 10s exponent');
      }
      else {
        currentText = 10 ** parseFloat(currentText);
        display.innerText = currentText.toString();
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
//eval secondList element
function secondListClick(functionName, elementVal) {
  if (elementVal === 'element6') {
    if (!currentText) {
      alertMsg('Add Value of n for nCr');
    }
    else {
      isCombination = true;
      tempNum = currentText;
      display.innerText = currentText + 'C';
      currentText = '';
    }
  }
  //all other are trigonometry function
  else {
    clearVar();
    isInverseTrigonometry = true;
    isTrigometry = functionName;
    display.innerText = functionName + '()';
  }
}
//mathPI
function mathPI() {
  currentText = (Math.PI).toFixed(4);
  currentText.toString();
  display.innerText = lastElements + '??';
}
//mathE
function mathE() {
  currentText = (Math.E).toFixed(4);
  currentText.toString();
  display.innerText = lastElements + 'e';
}
//clear button click
clearDisplay.forEach(clr => {
  clr.addEventListener('click', (e) => {
    if (e.target.innerText === 'C') {
      clearVar();
      display.innerText = '0';
      disabledBtn.forEach(btn => {
        btn.classList.add('disabled');
      })
      clickFE.classList.remove('btn-dark');
      console.log('Clear All'); //print clear All
    }
    else {
      if (lastElements) {
        if (currentText) {
          if (currentText[currentText.length - 1] === '.') isDot = false;
          currentText = currentText.substring(0, currentText.length - 1);
          display.innerText = lastElements + currentText;
        }
        else {
          let i = lastElements.length - 1;
          if (lastElements[i] === '+' || lastElements[i] === '-' || lastElements[i] === 'x' || lastElements === '??')
            //removed elements will be currentText
            currentText = plusMinus.pop();
          currentText = currentText.toString();
          let j = currentText.length;
          //remove last element from lastElements string
          i = i - j;
          lastElements = lastElements.substring(0, i);
          i = lastElements.length - 1;
          console.log(lastElements[i]);
          display.innerText = lastElements + currentText;
          console.log('after backspace lastElements >>' + lastElements);
          console.log('after backspace currentText >>' + currentText);
        }
      }
      //if there's trigonometry function
      else if (isTrigometry) {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        display.innerText = isTrigometry + '(' + currentText + ')';
      }
      else if (mathOperation) {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        display.innerText = mathOperation + '(' + currentText + ')';
      }
      else {
        if (currentText[currentText.length - 1] === '.') isDot = false;
        currentText = currentText.substring(0, currentText.length - 1);
        if (!currentText) display.innerText = 0;
        else display.innerText = currentText;
      }
    }
  })
})
// 1/x function
function inverseNum() {
  currentText = parseFloat(currentText) ** (-1);
  currentText = currentText.toFixed(2);
  display.innerText = lastElements + currentText.toString();
}
//operation
operator.forEach(operation => {
  operation.addEventListener('click', (e) => {
    e = e.target.innerText;
    if (e === '+' || e === '-') {
      checkPriority();
      isMultiplication = isDivision = isMod = isExp = false;
    }
    else if (e === 'x' || e === '??') {
      checkPriority();
      e === 'x' ? isMultiplication = true : isDivision = true;
      isMod = isExp = false;
    }
    else if (e === 'n!') {
      currentText = parseFloat(currentText);
    }
    else if (e === 'mod') {
      if (!currentText) {
        alert('Enter first Element for mod')
        return;
      }
      else {
        checkPriority();
        e === 'mod' ? isMod = true : isMod = false;
      }
    }
    else if (e === 'exp') {
      if (!currentText) {
        currentText = 1;
      }
      checkPriority();
      e === 'exp' ? isExp = true : isExp = false;
    }
    else if (e === '|x|') {
      e = '|';
      let answer;
      if (counter === 0) {
        //save outer calculation state ans set default inner state
        lastOpearationState = operationState;
        lastMultiplication = isMultiplication;
        lastDivision = isDivision;
        operationState = true;
        isDivision = isMultiplication = false;
        //index of first ele in bracket mod
        bracketStartIndex = plusMinus.length;
        counter++;
      }
      else {
        answer = evalBracketElements();
        //apply back outer calculation state
        isMultiplication = lastMultiplication;
        isDivision = lastDivision;
        operationState = lastOpearationState;
        console.log('element ans of mod>> ' + answer);
        operationState ? plusMinus.push(Math.abs(answer)) : plusMinus.push((-1) * Math.abs(answer));
        counter = 0;
        isBracket = true;
      }
    }
    else if (e === '(' || e === ')') {
      let answer;
      if (e === '(') {
        //save outer calculation state ans set default inner state
        lastOpearationState = operationState;
        lastMultiplication = isMultiplication;
        lastDivision = isDivision;
        operationState = true;
        isDivision = isMultiplication = false;
        //index of first ele in bracket
        bracketStartIndex = plusMinus.length;
      }
      else {
        answer = evalBracketElements();
        //apply back outer calculation state
        isMultiplication = lastMultiplication;
        isDivision = lastDivision;
        operationState = lastOpearationState;
        console.log('element ans of bracket>> ' + answer);
        operationState ? plusMinus.push(parseFloat(answer)) : plusMinus.push((-1) * parseFloat(answer));
        isBracket = true
      }
    }
    //print operator and add in string
    e === '-' ? operationState = false : operationState = true;
    lastElements += currentText.toString();
    lastElements += e;
    display.innerText = lastElements;
    currentText = '';
    isDot = false;
  })
})
//check priority
function checkPriority() {
  if (isBracket) {
    isBracket = false;
  }
  else {
    operationState ? plusMinus.push(parseFloat(currentText)) : plusMinus.push((-1) * parseFloat(currentText));
  }
  if (isMod) mod();
  else if (isExp) exp();
  else if (isDivision) division();
  else if (isMultiplication) multiplication();
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
//factorial
function fact(num) {
  let n;
  num ? n = parseFloat(num) : n = parseFloat(currentText);
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
    currentText = answer.toString();
    display.innerText = lastElements + currentText;
  }
}
//mod function
function mod() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] % plusMinus[len];
  plusMinus = plusMinus.slice(0, len);
  console.log("mod>> " + plusMinus); // mod>> answer
  isMod = false;
}
//exponential of e
function exp() {
  let len = plusMinus.length - 1;
  plusMinus[len - 1] = plusMinus[len - 1] * (Math.exp(plusMinus[len]));
  plusMinus = plusMinus.slice(0, len);
  console.log("exp>> " + plusMinus); // epx>> answer
  isExp = false;
}
//eval in bracket elements
function evalBracketElements() {
  let total = 0;
  checkPriority();
  bracketEndIndex = plusMinus.length - 1;
  let diff = bracketEndIndex - bracketStartIndex;
  for (let k = 0; k <= diff; k++) {
    total += plusMinus[bracketEndIndex];
    plusMinus.pop();
    bracketEndIndex--;
  }
  return total;
}
//click number
number.forEach(number => {
  number.addEventListener('click', (e) => {
    //check for multiple dot
    if (e.target.innerText === '.' && !isDot) {
      isDot = true;
    }
    else if (e.target.innerText === '.' && isDot) return;

    currentText += e.target.innerText;
    if (lastElements) {
      let temp = lastElements + currentText;
      display.innerText = temp;
      // display.innerText=lastElements;
    }
    else if (isTrigometry) {
      display.innerText = isTrigometry + '(' + currentText + ')';
    }
    else if (mathOperation) {
      display.innerText = mathOperation + '(' + currentText + ')';
    }
    else if (isCombination) {
      display.innerText = tempNum + 'C' + currentText;
    }
    else if (isPower) {
      display.innerText = tempNum + '^' + currentText;
    }
    else {
      display.innerText = currentText;
    }
  })
})
//plus or minus
function plusOrMinus() {
  if (mathOperation) {
    display.innerText = mathOperation + '(-' + currentText + ')';
    currentText = ((-1) * parseFloat(currentText)).toString();
  }
  else if (currentText) {
    operationState ? operationState = false : operationState = true;
    lastElements = lastElements + ' -';
    display.innerText = lastElements + currentText;
  }
}
//eval final answer
function equal() {
  if (isPower) {
    result = twoArgueFromUser(parseFloat(tempNum), parseFloat(currentText), 'power');
  }
  else if (isCombination) {
    let r = parseFloat(currentText);
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
    let ans = evalTrigonometry(isTrigometry, parseFloat(currentText));
    !isInverseTrigonometry ? result = ans : result = ans * (180 / Math.PI);
  }
  else if (mathOperation) {
    let ans = evalMathOperation(mathOperation, parseFloat(currentText));
    result = ans;
  }
  else if (plusMinus[0]) {
    currentText ? currentText : currentText = 0;
    checkPriority();
    operationState = true;
    let sum = 0;
    for (let el of plusMinus) {
      sum += el
    }
    console.log('Finale ans>> ' + sum);
    result = sum;
    console.log('Array elements>> ' + plusMinus);
    //if F-E is true
    if (isFE) {
      result = 10 ** result;
    }
  }
  else {
    !currentText ? result = 0 : result = currentText;
  }
  //if the result is in decimal
  result % 1 === 0 ? result = result : result = result.toFixed(4);
  //print result
  display.innerText = result;
  let tempAns = result;
  clearVar();
  currentText = tempAns.toString();
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
      clickOperatorButton('x');
    }
    else if (e === '/') {
      clickOperatorButton('??');
    }
    else if (e === '%') {
      clickOperatorButton('mod');
    }
    else {
      clickOperatorButton(e);
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
  else {
    return;
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
function clickOperatorButton(key) {
  operator.forEach(btn => {
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