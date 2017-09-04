import axios from 'axios';

const url = 'http://localhost:3000/api';

const capitalize = () => {
  let text = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

  console.log('The capital letter is ', text);
  return text;
};

const generatePassphrase = () => {
  let text = capitalize();

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 4; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  console.log('The generated passphrase is ', text);

  return text;
};

const parseDate = (date) => {
  const parsedDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return parsedDate;
};

function handleSender(event) {
  this.setState({
    sender: event,
  });
}

function handleMessage(msg) {
  this.setState({
    unencrypted: msg,
  });
}

function handleDate(date) {
  this.setState({
    date,
  });
}

function postMsg(passphrase, msgToEncrypt) {
  axios.post(`${url}/encrypt/${passphrase}`, msgToEncrypt)
    .then((res) => {
      console.log(res);
      this.setState({
        encrypted: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleClose() {
  console.log('resetting the state after closing dialog');
  // if I close the dialog box
  // how do I get the app to make another post request
  // using the same hashcode

  /*
    this.state = {
      sender: '',
      unencrypted: '',
      encrypted: '',
      date: '',
      passphrase: '',
      active: false,
      showDialog: ''
    }

  */
  this.setState({
    sender: '',
    unencrypted: '',
    encrypted: '',
    date: '',
    active: !this.state.active,
    showDialog: '',
  });
}

function decryptMsg() {
  console.log('inside handleDecrypt!');
  const msgToDecrypt = this.state.showDialog;
  const passphrase = this.state.passphrase;
  /*
  axios.get(`${url}/decrypt/${passphrase}`, msgToEncrypt)
    .then((res) => {
      console.log(res);
      this.setState({
        sender: ,
        date: ,
        unencrypted: 
      });
    })
    .catch((err) => {
      console.log(err);
    });
  */
}

function handleDialogInput(dialog) {
  this.setState({
    showDialog: dialog,
  });
}


function createNewPassphrase(event) {
  event.preventDefault();

  console.log('resetting the state');

  this.setState({
    sender: '',
    unencrypted: '',
    encrypted: '',
    date: '',
    passphrase: generatePassphrase(),
    active: false,
    showDialog: '',
  });
}

function displayMsg(string) {
  const stringLength = string.length;
}


module.exports = {
  generatePassphrase,
  parseDate,
  handleSender,
  handleMessage,
  handleDate,
  postMsg,
  handleClose,
  decryptMsg,
  handleDialogInput,
  createNewPassphrase,
};
