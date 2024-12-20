function checkButton(buttonClicked) {
  console.log(`${buttonClicked} was clicked`)
  //switch (buttonClicked) {

  }
}

let num1 = 0
let num2 = 0
let operand = ''

let currentValue = document.querySelector('#value')
currentValue.textContent = `${num1.toString()}`

const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
  button.addEventListener("click", (e) =>
    checkButton(button.textContent))

})

console.log(typeof num1.toString())