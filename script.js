function buttonFunction(buttonClicked, buttonClass) {
  console.log(`Clicked ${buttonClicked} button. Class:${buttonClass}`)
  switch (buttonClass) {
    case 'number':
      shiftNumber(buttonClicked)
      break
    case 'operator':
      storeOrCompute(buttonClicked)
      break
    case 'math-function':
      mathFunction(buttonClicked)
      break
  }
}

function equationIsComplete() {
  //console.log(`varX :${variableX.number} ${operator} varY:${variableY.number}`)
  if (variableX.number !== null && variableY.number !== null && operator)
    return true
  else
    return false
}

function updateDisplay(numericStr) {
  if (numericStr.length > 8) {
    computation = Number(numericStr)
    computation = parseFloat(computation).toExponential(2)
    display.textContent = `${computation}`
  }
  else
    display.textContent = numericStr
}

function shiftNumber(numberClicked) {
  if (variableX.number === null) {
    variableX.string += numberClicked
    updateDisplay(variableX.string)
  } else if (variableY.number === null) {
    variableY.string += numberClicked
    updateDisplay(variableY.string)
  }
}

function storeOrCompute(operatorClicked) {
  // console.log(equationIsComplete())

  if (variableX.number === null) {
    variableX.number = Number(display.textContent)
    operator = operatorClicked
  }

  if (variableY.string == '')
    operator = operatorClicked
  else
    variableY.number = Number(display.textContent)

  console.log(`varX :${variableX.number} ${operator} varY:${variableY.number}`)
  console.log(equationIsComplete())

  if (equationIsComplete()) {
    computation = compute(variableX.number, variableY.number, operator)
    updateDisplay(`${computation}`)
    softReset(computation, operatorClicked)
    operator = operatorClicked
  } else
    operator = operatorClicked

}


function compute(variableX, variableY, operatorClicked) {
  switch (operatorClicked) {
    case '+':
      computation = variableX + variableY
      break
    case '−':
      computation = variableX - variableY
      break
    case '×':
      computation = variableX * variableY
      break
    case '÷':
      if (variableY == 0) {
        alert('Dividing by 0 isn\'t allowed bro')
        hardReset()
      }
      else
        computation = variableX / variableY
      break
  }
  return computation
}

function mathFunction(functionClicked) {
  switch (functionClicked) {
    case '=':
      if (variableY.string == '')
        console.log('No second number to compute')
      else
        variableY.number = Number(display.textContent)

      if (equationIsComplete()) {
        computation = compute(variableX.number, variableY.number, operator)
        updateDisplay(`${computation}`)
        softReset(computation)
      }
      break
    case 'AC':
      hardReset()
      break
    case '%':
      specialButtons(PERCENT)
      break
    case '+/−':
      specialButtons(NEGATIVE)
      break
    case 'x²':
      if (variableX.number === null) {
        variableX.string = `${(Number(variableX.string) ** 2)}`
        updateDisplay(variableX.string)
      } else if (variableY.number === null) {
        variableY.string = `${Math.sqrt(Number(variableY.string) ** 2)}`
        updateDisplay(variableY.string)
      }
      break
    case '√':
      if (Number(display.textContent) < 0) {
        alert('This calculator does not deal with imaginary numbers')
      }
      else {
        if (variableX.number === null) {
          variableX.string = `${Math.sqrt(Number(variableX.string))}`
          updateDisplay(variableX.string)
        } else if (variableY.number === null) {
          variableY.string = `${Math.sqrt(Number(variableY.string))}`
          updateDisplay(variableY.string)
        }
      } 

      break
    case '.':
      if (variableX.number === null && !variableX.string.includes('.')) {
        console.log('thisrani in x')
        variableX.string += '.'
        updateDisplay(variableX.string)
      } else if (variableY.number === null
                  && !variableY.string.includes('.') 
                  && operator != null) {
        console.log('thisrani in y')
        variableY.string += '.'
        updateDisplay(variableY.string)
      } else {
        alert('Cannot have two decimal points')
        console.log('A decimal point already exists')
      }
      break

  }

}

function specialButtons(value) {
  if (variableX.number === null) {
    variableX.string = `${Number(variableX.string) * value}`
    updateDisplay(variableX.string)
  } else if (variableY.number === null) {
    variableY.string = `${Number(variableY.string) * value}`
    updateDisplay(variableY.string)
  }
}


function hardReset() {
  variableX = { string: '', number: null }
  variableY = { string: '', number: null }
  operator = null
  updateDisplay(ZERO)
}

function softReset(computation) {
  variableX = { string: `${computation}`, number: computation }
  variableY = { string: '', number: null }
}

// End of Function Definitions

// Start of Main
variableX = { string: '', number: null }
variableY = { string: '', number: null }
const ZERO = '0'
const PERCENT = 0.01
const NEGATIVE = -1

const DIGIT_LIMIT = 10 ** 8

let operator = null
let computation = 0

let display = document.querySelector('#display')
updateDisplay('0')

const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    buttonFunction(button.textContent, e.target.className)
  })
})