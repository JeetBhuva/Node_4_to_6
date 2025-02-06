function add(num1, num2) {

    return "This is add function :" + (Number(num1) + Number(num2))
}

function sub(num1, num2) {
    return "This is sub function" + (num1 - num2);
}

function multi(num1, num2) {
    console.log("This is multi function", num1 * num2);
}

function div() {
    console.log("This is div function");
}


module.exports = {
    add: add,
    sub: sub,
    multi: multi,
    div: div
}

