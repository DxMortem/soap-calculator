const app = require('./app');
const config = require('./common/configuration');
const soap = require('soap');
const soapService = require('./routes/calc.controller');

const port = config.get('app.port');
const soapPath = config.get('soap.path');
const wsdlPath = config.get('soap.wsdlFilePath');
const wsdl = require('fs').readFileSync(process.cwd()+wsdlPath,'utf8');

app.listen(port, () => {
  soap.listen(app, soapPath, soapService, wsdl, ()=>{console.log("SOAP Initialized")});
  console.log('Server running at port:', port);
});
