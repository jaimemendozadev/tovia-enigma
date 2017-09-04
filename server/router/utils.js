const CryptoJS = require('crypto-js');
const inMemoryDB = require('../db/index.js');

const parseDate = (date) => {
  const parsedDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return parsedDate;
};


const encryptAndSave = (sender, date, passphrase, msgToEncrypt) => {
  inMemoryDB.currentPassphrase = passphrase;


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

  return encrypted;
};


const retrieveAndDecrypt = (msgToDecrypt, passphrase) => {
  let currentDate = new Date();
  currentDate = parseDate(currentDate);

  const availableMsgs = inMemoryDB[passphrase];


  let msgFound = false;

  availableMsgs.map((msg) => {
    if (msg.encrypted === msgToDecrypt) {
      msgFound = msg;
    }
  });

  if (msgFound !== false && msgFound) {
    const bytes = CryptoJS.AES.decrypt(msgToDecrypt.toString(), passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  }
};

module.exports = {
  parseDate,
  encryptAndSave,
  retrieveAndDecrypt,
};
