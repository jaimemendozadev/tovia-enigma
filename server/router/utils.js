const CryptoJS = require('crypto-js');
const inMemoryDB = require('../db/index.js');
const moment = require('moment');


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

  return encrypted;
};


const retrieveAndDecrypt = (msgToDecrypt, passphrase) => {
  const currentDate = new Date();

  const availableMsgs = inMemoryDB[passphrase];

  if (availableMsgs === undefined) {
    return { error: 'Whoops, there was an error retrieving your message' };
  }

  let msgFound = false;

  availableMsgs.forEach((msg) => {
    if (msg.encrypted === msgToDecrypt) {
      msgFound = msg;
    }
  });

  const notExpired = moment(currentDate).isBefore(msgFound.date);

  if (msgFound !== false && notExpired === true) {
    const bytes = CryptoJS.AES.decrypt(msgToDecrypt.toString(), passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    const msgResponse = {};
    msgResponse.sender = msgFound.sender;
    msgResponse.date = msgFound.date;
    msgResponse.encrypted = decrypted;

    return msgResponse;
  } else if (msgFound !== false && notExpired === false) {
    return { error: 'Sorry, your message has expired and is no longer available to decrypt.' };
  }
  return { error: 'Whoops, there was an error retrieving your message' };
};

module.exports = {
  encryptAndSave,
  retrieveAndDecrypt,
};
