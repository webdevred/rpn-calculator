window.onload = () => {
    const expressionInput = document.querySelector("#expression");
    const resultSpan = document.querySelector("#result");

    expressionInput.onkeyup = () => resultSpan.innerText = solveRPN(expressionInput.value);

};


const solveRPN = (expression) => {
    let resultArray = expression.split(" ").reduce(reducingFun, []);
    if (resultArray.length === 1) {
        return resultArray[0];
    } else {
        return "";
    }
};


const reducingFun = (stack, single) => {
    if (isNumeric(single)) return [single, ...stack];

    let [y, x] = stack.slice(0, 2);

    if (!isNumeric(x) && !isNumeric(y)) return [];

    let rest = stack.slice(2);

    switch (single) {
        case "+":
            return [parseFloat(x) + parseFloat(y), ...rest];
        case "*":
            return [parseFloat(x) * parseFloat(y), ...rest];
        case "-":
            return [parseFloat(x) - parseFloat(y), ...rest];
        case "/":
            return [parseFloat(x) / parseFloat(y), ...rest];
        case "^":
            return [Math.pow(parseFloat(x), parseFloat(y)), ...rest];
    }

};

const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
};

// console.log(solveRPN("2 2 +"));  4

// console.log(solveRPN("5 2 -")); 3

// console.log(solveRPN("10 5 /")); 2

// console.log(solveRPN("10 4 3 + 2 * -")); -4
