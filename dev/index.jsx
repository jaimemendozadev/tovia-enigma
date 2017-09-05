import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from 'react-toolbox';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import Dialog from 'react-toolbox/lib/dialog';
import styles from '../public/styles.css';
import Form from './components/form.jsx';

const { generatePassphrase, handleSender, handleMessage, handleDate, postMsg, handleEncrypt, handleClose, decryptMsg, handleDecrypt, handleDialogInput, createNewPassphrase, handleSnackbarTimeout } = require('./utils.js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: '',
      unencrypted: '',
      encrypted: '',
      date: '',
      passphrase: '',
      active: false,
      showDialog: '',
      showSnackbar: false,
    };
    this.handleClose = handleClose.bind(this);
    this.decryptMsg = decryptMsg.bind(this);
    this.handleSender = handleSender.bind(this);
    this.handleMessage = handleMessage.bind(this);
    this.handleDate = handleDate.bind(this);
    this.handleEncrypt = handleEncrypt.bind(this);
    this.handleDecrypt = handleDecrypt.bind(this);
    this.createNewPassphrase = createNewPassphrase.bind(this);
    this.handleDialogInput = handleDialogInput.bind(this);
    this.handleSnackbarTimeout = handleSnackbarTimeout.bind(this);
  }

  componentDidMount() {
    this.setState({
      passphrase: generatePassphrase(),
    });
  }

  render() {
    // actions for Dialog buttons
    const actions = [
      { label: 'CLOSE', onClick: this.handleClose },
      { label: 'DECRYPT', onClick: this.decryptMsg },
    ];

    return (
      <div className="container">
        <Form
          sender={this.state.sender}
          handleSender={this.handleSender}
          unencrypted={this.state.unencrypted}
          handleMessage={this.handleMessage}
          date={this.state.date}
          handleDate={this.handleDate}
          handleEncrypt={this.handleEncrypt}
          decryptMsg={this.handleDecrypt}
        />

        <div className="btn-container">

          <Link href="#" label={`Your passphrase - ${this.state.passphrase}`} />
          <Link onClick={this.createNewPassphrase} href="#" label="Generate new Passphrase" />

        </div>

        <Dialog
          actions={actions}
          active={this.state.active}
          title="De/Encrypt"
        >
          <Input
            type="text"
            label="Message"
            name="message"
            multiline
            value={this.state.showDialog}
            onChange={this.handleDialogInput}
          />

        </Dialog>

        <section>
          <Snackbar
            active={this.state.showSnackbar}
            label="You're message is missing something. Please fill out the form   entirely."
            timeout={3500}
            onTimeout={this.handleSnackbarTimeout}
          />
        </section>

      </div>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));
