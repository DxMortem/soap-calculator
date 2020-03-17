const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

module.exports = router;
