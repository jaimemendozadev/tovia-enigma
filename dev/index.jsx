import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Snackbar} from 'react-toolbox'
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import Dialog from 'react-toolbox/lib/dialog';
import styles from '../public/styles.css';
import axios from 'axios';

import Form from './components/form.jsx';
const {generatePassphrase, handleSender, handleMessage, handleDate, postMsg, handleEncrypt, handleClose, decryptMsg, handleDialogInput, createNewPassphrase, handleSnackbarTimeout} = require('./utils.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sender: '',
      unencrypted: '',
      encrypted: '',
      date: '',
      passphrase: '',
      active: false,
      showDialog: '',
      showSnackbar: false
    }
    
  }

  componentDidMount() {
    this.setState({
      passphrase: generatePassphrase()
    });
  }

  render(){
    //actions for Dialog buttons
    const actions = [
      { label: 'CLOSE', onClick: handleClose.bind(this) },
      { label: 'DECRYPT', onClick: decryptMsg.bind(this) },
    ];

    return (
      <div className="container">
        <Form
          sender={this.state.sender} 
          handleSender={handleSender.bind(this)}
          unencrypted={this.state.unencrypted}
          handleMessage={handleMessage.bind(this)}
          date={this.state.date}
          handleDate={handleDate.bind(this)}
          handleEncrypt={handleEncrypt.bind(this)}
          decryptMsg={decryptMsg.bind(this)} 
        />

        <div className="btn-container">

          <Link href="#" label={`Your passphrase - ${this.state.passphrase}`} />
          <Link onClick={createNewPassphrase.bind(this)} href="#" label="Generate new Passphrase" />

        </div>



        <Dialog
          actions={actions}
          active={this.state.active}
          title="De/Encrypt"
        >
          <Input 
            type='text' 
            label='Message' 
            name='message' 
            multiline 
            value={this.state.showDialog}
            onChange={handleDialogInput.bind(this)} 
            />

        </Dialog>

        <section>
        <Snackbar
          active={this.state.showSnackbar}
          label="You're message is missing something. Please fill out the form entirely."
          timeout={3500}
          onTimeout={handleSnackbarTimeout.bind(this)}
        />
        </section>

      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));