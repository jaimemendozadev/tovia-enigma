const router = require('express').Router();
const CryptoJS = require('crypto-js');

router.post('/encrypt/:passphrase', (req, res) => {
  const passphrase = req.params.passphrase;
  console.log('the passphrase is ', passphrase);

  const encryptedMsg = CryptoJS.AES.encrypt(req.body.unencrypted, passphrase);

  console.log('encryptedMsg is ', encryptedMsg.toString());

  const encryptedStrMsg = encryptedMsg.toString();

  // const bytes = CryptoJS.AES.decrypt(encryptedMsg.toString(), passphrase);
  // console.log('decrypted bytes are ', bytes);
  // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  // console.log('converted plaintext is ', plaintext);

  res.send(encryptedStrMsg);
});

module.exports = router;
