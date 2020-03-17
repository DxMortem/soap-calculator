const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(404).send('<h1>Error 404: Not Found</h1>');
});

module.exports = router;
