const router = require('express').Router();

router.post('/encrypt', (req, res) => {
  console.log('hit the api bro!', req.body.msg);
  res.send('hit the api bro');
});

module.exports = router;
