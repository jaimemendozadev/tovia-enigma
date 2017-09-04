import axios from 'axios';

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
  axios.post(`http://localhost:3000/api/encrypt/${passphrase}`, msgToEncrypt)
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

function handleDecrypt() {
  console.log('do something!');
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
  handleDecrypt,
  createNewPassphrase,
};
