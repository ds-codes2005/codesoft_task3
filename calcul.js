const input = document.querySelector('.input');
const buttons = document.querySelectorAll('.button, .button1');


let powerOn = true;
let lastExpression = "";
let result = "";
let expressionArray = [];
let leftIndex = null;
let rightIndex = null;
const history = [];

function evaluateExpression(expr) {
    try {
        return eval(expr);
    } catch (err) {
        return "Error";
    }
}

function resetPointers() {
    leftIndex = expressionArray.length - 1;
    rightIndex = 0;
}

function addToHistory(expr, res) {
    if (expr && res !== undefined) {
        history.unshift(`${expr} = ${res}`);
        if (history.length > 5) history.pop();
    }
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!powerOn && value !== "On/OFF") return;

        switch (value) {
            case '=':
                lastExpression = input.value;
                result = evaluateExpression(lastExpression);
                expressionArray = lastExpression.match(/(\d+|\+|\-|\*|\/|\.)/g) || [];
                resetPointers();
                addToHistory(lastExpression, result);
                input.value = result;
                break;

            case 'On/OFF':
                powerOn = !powerOn;
                input.disabled = !powerOn;
                if (!powerOn) input.value = "";
                break;

            case 'Check Left':
                if (expressionArray.length === 0) {
                    input.value = "No expression";
                    return;
                }
                if (leftIndex >= 0) {
                    input.value = expressionArray[leftIndex];
                    leftIndex--;
                } else {
                    input.value = "← End";
                }
                break;

            case 'Check Right':
                if (expressionArray.length === 0) {
                    input.value = "No expression";
                    return;
                }
                if (rightIndex < expressionArray.length) {
                    input.value = expressionArray[rightIndex];
                    rightIndex++;
                } else {
                    input.value = "→ End";
                }
                break;

            case 'Last Result':
                input.value = result || "";
                break;

            case 'Clear':
                input.value = "";
                break;

            case 'History':
                if (history.length === 0) {
                    input.value = "No history";
                } else {
                    alert("History:\n" + history.join("\n"));
                }
                break;

            default:
                input.value += value;
        }
    });
});

