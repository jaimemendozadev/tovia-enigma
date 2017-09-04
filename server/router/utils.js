const CryptoJS = require('crypto-js');
const inMemoryDB = require('../db/index.js');
const moment = require('moment');


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
  const currentDate = new Date();
  // currentDate = parseDate(currentDate);

  const availableMsgs = inMemoryDB[passphrase];


  let msgFound = false;

  availableMsgs.forEach((msg) => {
    if (msg.encrypted === msgToDecrypt) {
      msgFound = msg;
    }
  });

  const notExpired = moment(currentDate).isBefore(msgFound.date);

  console.log('Not expired is ', notExpired);

  if (msgFound !== false && notExpired === true) {
    const bytes = CryptoJS.AES.decrypt(msgToDecrypt.toString(), passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    msgFound.encrypted = decrypted;

    return msgFound;
  } else if (msgFound !== false && notExpired === false) {
    return 'Sorry, your message has expired and is no longer available to decrypt.';
  }
  return 'Whoops, there was an error retrieving your message';
};

module.exports = {
  parseDate,
  encryptAndSave,
  retrieveAndDecrypt,
};
