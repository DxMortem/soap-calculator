const router = require('express').Router();

router.get('/',(req, res, next) => {
  res.type('application/xml');
  next();
});

const service = function(args){
  //TODO: Response WS
};

module.exports = {
  router,
  service
};
