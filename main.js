let buttons = document.querySelector('.calc-buttons');

let state = {
    currButton   : "",
    currIntValue : null,
    operandString: "",
    runningTotal : 0,
    prevButton   : "",
    prevOperator : "",
    screenBuffer : document.querySelector('.calc-screen')
}

function resetState(state)
{
    state.currButton    = "";
    state.currIntValue  = null,
    state.operandString = "";
    state.runningTotal  = 0;
    state.prevButton    = "";
    state.prevOperator  = "";
    state.screenBuffer.textContent = "0";
}

function isOperator(value)
{
    if (value)
    {
        return "+−×÷=".includes(value);
    }
}

function handleNumber(state)
{
    if (!isNaN(state.currIntValue))
    {
        if (!state.operandString)
        {
            if (state.prevOperator!=="=" && state.currIntValue)
            {
                state.operandString = state.currButton;
                state.screenBuffer.textContent = state.currButton;
            }
        }
        else 
        {
            state.operandString += state.currButton;
            state.screenBuffer.textContent += state.currButton;
        }
    }
}
function handleNegativeSign(state)
{
    if (state.currButton==="+/−" && state.prevButton!=="+/−")
    {
        if (state.prevOperator==="=")
        {
            state.runningTotal *= -1;
            state.screenBuffer.textContent = state.runningTotal;
        }
        else
        {
            state.operandString = "-" + state.operandString;
            state.screenBuffer.textContent = state.operandString;
        }
    }
}

function handleBackspace(state)
{
    if (state.currButton==="←")
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

function handleOperator(state)
{
    if (!isOperator(state.prevButton) 
        && isOperator(state.currButton)
        && state.operandString)
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
    }
}

function init() {

    buttons.addEventListener('click', function(event) 
    {
        state.currButton = event.target.textContent.trim();
        state.currIntValue = parseInt(state.currButton);

        if (!isNaN(state.currIntValue))
        {
            handleNumber(state);
        }

        else if(state.currButton==="+/−")
        {
            handleNegativeSign(state);
        }

        else if (state.currButton==="C")
        {
            resetState(state);
        }

        else if (state.currButton==="←")
        {
            handleBackspace(state);
        }

        else if (isOperator(state.currButton))
        {
            handleOperator(state);
            state.screenBuffer.textContent = state.runningTotal;
            state.prevOperator = state.currButton;
            state.operandString = "";
        }

        if (state.currButton!=="C")
        {
            state.prevButton = state.currButton;
        }
    })
}


init()