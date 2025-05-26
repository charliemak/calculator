let buttons = document.querySelector('.calc-buttons');

let state = {
    currButton   : "",
    operandString: "",
    runningTotal : 0,
    prevButton   : "",
    prevOperator : "",
    screenBuffer : document.querySelector('.calc-screen')
}

function resetState(state)
{
    state.currButton    = "";
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
        let intValue = parseInt(state.currButton);

        if (!isNaN(intValue))
        {
            if (!state.operandString)
            {
                if (intValue)
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

        else if(state.currButton==="+/−")
        {
            state.operandString = "-" + state.operandString;
            state.screenBuffer.textContent = state.operandString;
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