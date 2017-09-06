import axios from 'axios';
import moment from 'moment';

// const url = 'http://localhost:3000/api'; //use this for local development
const url = '/api';

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
  const currentDate = new Date();

  if (moment(date).isBefore(currentDate, 'second')) {
    this.setState({
      showDateSnackbar: true,
    });
  } else {
    this.setState({
      date,
    });
  }
}


function postMsg(passphrase, msgToEncrypt) {
  axios.post(`${url}/encrypt/${passphrase}`, msgToEncrypt)
    .then((res) => {
      console.log('Msg successfully encrypted', res);
      this.setState({
        encrypted: res.data,
      });
    })
    .catch((err) => {
      console.log('Error sending encrypted msg to backend ', err);

      this.setState({
        sender: '',
        unencrypted: 'Whoops, there was an error saving your encrypted message',
        encrypted: '',
        date: '',
        active: !this.state.active,
        showDialog: '',
      });
    });
}


function handleEncrypt() {
  if (this.state.sender.length === 0 || !this.state.date || this.state.unencrypted.length === 0) {
    this.setState({
      showFormSnackbar: true,
    });
    return;
  }
  // if we don't have an encrypted msg in state from DB
  // create msg to send to DB for encryption
  if (this.state.encrypted.length === 0) {
    const msgToEncrypt = {
      sender: this.state.sender,
      date: this.state.date,
      unencrypted: this.state.unencrypted,
    };
    const passphrase = this.state.passphrase;

    postMsg.call(this, passphrase, msgToEncrypt);
  } else {
    // we do have an encrypted message from server/DB
    // display in dialog box
    const showDialog = this.state.encrypted;
    this.setState({
      active: !this.state.active,
      showDialog,
    });
  }
}

function handleClose() {
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
  const msgToDecrypt = this.state.showDialog;
  const passphrase = this.state.passphrase;

  axios.post(`${url}/decrypt/${passphrase}`, { msgToDecrypt })
    .then((res) => {
      console.log('Msg successfully decrypted', res);

      if (res.data.error) {
        this.setState({
          sender: '',
          date: '',
          unencrypted: res.data.error,
          active: false,
        });
      } else {
        this.setState({
          sender: res.data.sender,
          unencrypted: res.data.encrypted,
          date: new Date(res.data.date),
          active: false,
        });
      }
    })
    .catch((err) => {
      console.log('Error decrypting msg from backend ', err);

      this.setState({
        sender: '',
        date: '',
        unencrypted: 'Whoops, there was an error retrieving your message',
        active: false,
      });
    });
}

function handleDecrypt() {
  this.setState({
    active: !this.state.active,
    showDialog: '',
  });
}

function handleDialogInput(dialog) {
  this.setState({
    showDialog: dialog,
  });
}


function createNewPassphrase(event) {
  event.preventDefault();

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

function handleSnackbarFormTimeout() {
  this.setState({
    showFormSnackbar: false,
  });
}

function handleSnackbarDateTimeout() {
  this.setState({
    showDateSnackbar: false,
  });
}

module.exports = {
  generatePassphrase,
  handleSender,
  handleMessage,
  handleDate,
  postMsg,
  handleEncrypt,
  handleClose,
  decryptMsg,
  handleDecrypt,
  handleDialogInput,
  createNewPassphrase,
  handleSnackbarFormTimeout,
  handleSnackbarDateTimeout,
};
