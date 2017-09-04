const router = require('express').Router();
const CryptoJS = require('crypto-js');
const inMemoryDB = require('../db/index.js');

/*
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
*/


router.post('/encrypt/:passphrase', (req, res) => {
  const sender = req.body.sender;
  const date = req.body.date;

  const passphrase = req.params.passphrase;
  inMemoryDB.currentPassphrase = passphrase;

  const msgToEncrypt = req.body.unencrypted;

  const encryptedMsg = CryptoJS.AES.encrypt(msgToEncrypt, passphrase);
  const encrypted = encryptedMsg.toString();

  const newMsg = {
    sender,
    date,
    encrypted,
  };

  if (!inMemoryDB[passphrase]) {
    inMemoryDB[passphrase] = [newMsg];
  } else {
    inMemoryDB[passphrase].push(newMsg);
  }

  console.log('db is ', inMemoryDB);


  res.send(encrypted);
});

router.get('/decrypt/:passphrase', (req, res) => {
  const passphrase = req.params.passphrase;
  const msgToDecrypt = req.body.encryptedMsg;

  const bytes = CryptoJS.AES.decrypt(msgToDecrypt.toString(), passphrase);

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  res.send(decrypted);
});


module.exports = router;
