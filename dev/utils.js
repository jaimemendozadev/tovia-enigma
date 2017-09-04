import axios from 'axios';

const url = 'http://localhost:3000/api';

const generatePassphrase = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

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

function handleToggle() {
  this.setState({
    active: !this.state.active,
  });
}

function decryptMsg() {
  console.log('inside handleDecrypt!');
  const msgToDecrypt = this.state.showDialog;
  const passphrase = this.state.passphrase;

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
  handleToggle,
  decryptMsg,
  createNewPassphrase,
};
