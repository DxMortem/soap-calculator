const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.type('application/xml');
  next();
});

function add(number1, number2) {
  return number1 + number2;
}

function multiply(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 + number2;
}

function divide(number1, number2) {
  return number1 + number2;
}

const service = {
  Calculator_WS: {
    calculatorPort: {
      calculate(args) {
        let result;
        switch (args.operation) {
          case '+':
            result = add(args.number1, args.number2);
            break;
          case '-':
            result = subtract(args.number1, args.number2);
            break;
          case '*':
            result = multiply(args.number1, args.number2);
            break;
          case '/':
            result = divide(args.number1, args.number2);
            break;
          default:
            result = 'Invalid operation please try with "+" "-" "*" or "/"';
        }
        return result;
      },
    },
  },
};

module.exports = {
  router,
  service,
};
