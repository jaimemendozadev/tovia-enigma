import axios from 'axios';

const url = 'http://localhost:3000/api';

const capitalize = () => {
  let text = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

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
      console.log('Response after posting unencrypted msg to server', res);
      this.setState({
        encrypted: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleClose() {
  console.log('Resetting the state after closing dialog');

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
  console.log('Inside handleDecrypt!');
  const msgToDecrypt = this.state.showDialog;
  const passphrase = this.state.passphrase;


  axios.post(`${url}/decrypt/${passphrase}`, { msgToDecrypt })
    .then((res) => {
      console.log('Response after posting encrypted msg to server', res);

      // this.setState({
      //   sender: ,
      //   date: ,
      //   unencrypted: 
      // });
    })
    .catch((err) => {
      console.log(err);
    });
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

function handleSnackbarTimeout() {
  this.setState({
    showSnackbar: false,
  });
}

module.exports = {
  generatePassphrase,
  handleSender,
  handleMessage,
  handleDate,
  postMsg,
  handleClose,
  decryptMsg,
  handleDialogInput,
  createNewPassphrase,
  handleSnackbarTimeout,
};
