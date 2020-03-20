const router = require('express').Router();
const logger = require('../common/logger')(module);

router.get('/', (req, res, next) => {
  res.type('application/xml');
  next();
});

function makeSoapFault(value, subcodeValue, reasonText, statusCodeNum) {
  return {
    Fault: {
      Code: {
        Value: value,
        Subcode: {
          value: subcodeValue,
        },
        Reason: {
          Text: reasonText,
        },
        statusCode: statusCodeNum,
      },
    },
  };
}

function add(number1, number2) {
  return number1 + number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function divide(number1, number2) {
  if (number2 === 0) {
    logger.error('Invalid operation, number 2 equal to zero');
    throw makeSoapFault('soap:Sender', 'Invalid operation', 'Number 2 equal to zero', 400);
  }
  return number1 / number2;
}

function executeOperation(operation, number1, number2) {
  let result;
  switch (operation) {
    case '+':
      result = add(number1, number2);
      break;
    case '-':
      result = subtract(number1, number2);
      break;
    case '*':
      result = multiply(number1, number2);
      break;
    case '/':
      result = divide(number1, number2);
      break;
    default:
      logger.error('Invalid operation');
      throw makeSoapFault('soap:Sender', 'Invalid operation', '\'Invalid operation please try with "+" "-" "*" or "/"\'', 400);
  }
  return result;
}

const service = {
  Calculator_WS: {
    calculatorPort: {
      calculate(args) {
        logger.info(`request with params ${args.operation} ${args.number1} ${args.number2}`);
        if (Number.isNaN(args.number1) || Number.isNaN(args.number2)) {
          logger.error('Argument NaN');
          throw makeSoapFault('soap:Sender', 'Not a Number', '\'Invalid, one of them is not number please verify', 400);
        }
        return executeOperation(args.operation, args.number1, args.number2);
      },
    },
  },
};

module.exports = {
  router,
  service,
};
