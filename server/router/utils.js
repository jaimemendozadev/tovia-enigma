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

  console.log('db is ', inMemoryDB);

  return encrypted;
};


const retrieveAndDecrypt = (msgToDecrypt, passphrase) => {
  const currentDate = new Date();

  // handle case where there's no array for passphrase passed
  const availableMsgs = inMemoryDB[passphrase];

  console.log('availableMsgs is ', availableMsgs);

  if (availableMsgs === undefined) {
    return { error: 'Whoops, there was an error retrieving your message' };
  }


  let msgFound = false;

  availableMsgs.forEach((msg) => {
    console.log('msg is ', msg);
    console.log(`msgToDecrypt is ${msgToDecrypt}`);

    if (msg.encrypted === msgToDecrypt) {
      msgFound = msg;
    }
  });

  const notExpired = moment(currentDate).isBefore(msgFound.date);

  console.log('The msgFound in DB is ', msgFound);
  console.log('Not expired is ', notExpired);

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
