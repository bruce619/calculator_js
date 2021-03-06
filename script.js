document.addEventListener("DOMContentLoaded", ()=>{

    class myCalculator {
        constructor(previousOperandTextElement, currentOperandTextElement) {
          this.previousOperandTextElement = previousOperandTextElement
          this.currentOperandTextElement = currentOperandTextElement
          this.clear()
        };

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
        };
        
        chooseOperation(operation) {
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.compute()
            };
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        };
        
        compute() {
            let computation
            const previous = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if (isNaN(previous) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    computation = previous + current
                    break
                case '-':
                    computation = previous - current
                    break
                case '*':
                    computation = previous * current
                    break
                case '÷':
                    computation = previous / current
                    break
                default:
                return
            };

            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
            
        };
        
        getDisplayNumber(number) {
            const stringNumber = number.toString()
            const integerNumber = parseFloat(stringNumber.split('.')[0])
            const decimalNumber = stringNumber.split('.')[1]
            var integerDisplay
            if (isNaN(integerNumber)) {
                integerDisplay = ''
            } else {
                integerDisplay = integerNumber.toLocaleString('en', { maximumFractionDigits: 0 })
            };
            if (decimalNumber != null) {
                return `${integerDisplay}.${decimalNumber}`
            }else {
                return integerDisplay
            };
        };
        
        updateDisplay() {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
            if (this.operation != null) {
                this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            }else {
                this.previousOperandTextElement.innerText = ''
            };
        };
      
        clear() {
            this.operation = undefined
            this.currentOperand = ''
            this.previousOperand = ''
          
        };
      
        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        };
      
      };
      
      
      const numberButtons = document.querySelectorAll('[data-number]')
      const operationButtons = document.querySelectorAll('[data-operation]')
      const equalsButton = document.querySelector('[data-equal]')
      const deleteButton = document.querySelector('[data-delete]')
      const allClearButton = document.querySelector('[data-all-clear]')
      const previousOperandTextElement = document.querySelector('[data-previous-operand]')
      const currentOperandTextElement = document.querySelector('[data-current-operand]')
      
      const calculator = new myCalculator(previousOperandTextElement, currentOperandTextElement)
      
      numberButtons.forEach(button => {
        button.addEventListener('click', () => {
          calculator.appendNumber(button.innerText)
          calculator.updateDisplay()
        });
      });
      
      operationButtons.forEach(button => {
        button.addEventListener('click', () => {
          calculator.chooseOperation(button.innerText)
          calculator.updateDisplay()
        });
      });
      
      equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
      });
      
      allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
      });
      
      deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
      });

})