let buttons = document.querySelector('.calc-buttons');

let state = {
    operandString: "",
    runningTotal : 0,
    prevOperator : "",
    screenBuffer : document.querySelector('.calc-screen')
}

function resetState(state)
{
    state.operandString = "";
    state.runningTotal  = 0;
    state.prevOperator  = "";
    state.screenBuffer.textContent = "0";
}

function handleBackspace(state, buttonValue)
{
    if (buttonValue==="←")
    {
        truncatedString = 
            state
            .operandString
            .substring(0, state.operandString.length - 1);

        if (truncatedString)
        {
            state.screenBuffer.textContent = truncatedString;
            state.operandString = truncatedString;
        }
        else 
        {
            if (state.operandString)
            {
                state.screenBuffer.textContent = "0";
                state.operandString = "";
            }
        }
    }
}

function init() {

    buttons.addEventListener('click', function(event) {
        let value = event.target.textContent.trim();
        let intValue = parseInt(value);

        if (!isNaN(intValue))
        {
            if (!state.operandString)
            {
                if (intValue)
                {
                    state.operandString = value;
                    state.screenBuffer.textContent = value;
                }
            }
            else 
            {
                state.operandString += value;
                state.screenBuffer.textContent += value;
            }

        }

        else if (value==="C")
        {
            resetState(state);
        }

        else if (value==="←")
        {
            handleBackspace(state, value);
        }

        else if ("+−×÷=".includes(value))
        {
            switch (state.prevOperator) {
                case "+":
                    state.runningTotal += parseInt(state.operandString);
                    break;
                case "−":
                    state.runningTotal -= parseInt(state.operandString);
                    break;
                case "×":
                    state.runningTotal *= parseInt(state.operandString);
                    break;
                case "÷":
                    state.runningTotal /= parseInt(state.operandString);
                    break;
                case "=":
                    break;        
                default:
                    state.runningTotal = parseInt(state.operandString);
                    break;
            }

            state.screenBuffer.textContent = state.runningTotal;
            state.prevOperator = value;
            state.operandString = "";
        }
    })
}


init()