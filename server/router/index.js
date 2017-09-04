const router = require('express').Router();
const { encryptAndSave, retrieveAndDecrypt } = require('./utils.js');

router.post('/encrypt/:passphrase', (req, res) => {
  const sender = req.body.sender;
  const date = req.body.date;
  const passphrase = req.params.passphrase;
  const msgToEncrypt = req.body.unencrypted;

  const encrypted = encryptAndSave(sender, date, passphrase, msgToEncrypt);

  res.send(encrypted);
});

router.get('/decrypt/:passphrase', (req, res) => {
  const date = req.body.date;

  const msgToDecrypt = req.body.encryptedMsg;
  const passphrase = req.params.passphrase;

  const decrypted = retrieveAndDecrypt(date, msgToDecrypt, passphrase);


  res.send(decrypted);
});


module.exports = router;
