let displayValue = '0';
let currentInput = '';
let operator = '';
let waitingForSecondOperand = false;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    currentInput = '';
    operator = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendSymbol(symbol) {
    if (symbol === '.' && displayValue.includes('.')) return; // Avoid adding multiple decimal points

    if (waitingForSecondOperand) {
        displayValue = symbol;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? symbol : displayValue + symbol;
    }

    updateDisplay();
}

function handleOperator(op) {
    if (operator && !waitingForSecondOperand) {
        calculateResult();
    }

    currentInput = displayValue;
    operator = op;
    waitingForSecondOperand = true;
}

function calculateResult() {
    const firstOperand = parseFloat(currentInput);
    const secondOperand = parseFloat(displayValue);

    if (isNaN(firstOperand) || isNaN(secondOperand)) {
        clearDisplay();
        return;
    }

    switch (operator) {
        case '+':
            displayValue = (firstOperand + secondOperand).toString();
            break;
        case '-':
            displayValue = (firstOperand - secondOperand).toString();
            break;
        case '*':
            displayValue = (firstOperand * secondOperand).toString();
            break;
        case '/':
            if (secondOperand === 0) {
                clearDisplay();
                alert("Error: Division by zero");
                return;
            }
            displayValue = (firstOperand / secondOperand).toString();
            break;
        default:
            break;
    }

    operator = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', updateDisplay);
document.querySelectorAll('button:not(.operator)').forEach(button => {
    button.addEventListener('click', () => appendSymbol(button.innerText));
});

document.querySelectorAll('.operator').forEach(opButton => {
    opButton.addEventListener('click', () => handleOperator(opButton.innerText));
});