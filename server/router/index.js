const router = require('express').Router();
const CryptoJS = require('crypto-js');

router.post('/encrypt', (req, res) => {
  console.log('hit the api bro!', req.body);

  const encryptedMsg = CryptoJS.AES.encrypt(req.body.unencrypted, req.body.passphrase);
  console.log('encryptedMsg is ', encryptedMsg);

  const bytes = CryptoJS.AES.decrypt(encryptedMsg.toString(), req.body.passphrase);
  console.log('decrypted bytes are ', bytes);

  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log('converted plaintext is ', plaintext);

  res.send('hit the api bro');
});

module.exports = router;
