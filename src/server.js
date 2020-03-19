const soap = require('soap');
const fs = require('fs');
const app = require('./app');
const config = require('./common/configuration');
const calculator = require('./routes/calc.controller');

const port = config.get('app.port');
const soapPath = config.get('soap.path');
const wsdlPath = config.get('soap.wsdlFilePath');
const wsdl = fs.readFileSync(process.cwd() + wsdlPath, 'utf8');

app.listen(port, () => {
  soap.listen(app, soapPath, calculator.service, wsdl, () => { console.log('SOAP Initialized'); });
  console.log('Server running at port:', port);
});
