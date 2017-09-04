import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import styles from '../public/styles.css';
import axios from 'axios';
const {generatePassphrase, parseDate, handleSender, handleMessage, handleDate, postMsg, handleToggle, decryptMsg, createNewPassphrase} = require('./utils.js');

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
      showDialog: ''
    }
    this.handleSender = handleSender.bind(this);
    this.handleMessage = handleMessage.bind(this);
    this.handleDate = handleDate.bind(this);
    this.checkEncrypt = this.checkEncrypt.bind(this);
    this.postMsg = postMsg.bind(this);

    this.createNewPassphrase = createNewPassphrase.bind(this);
    this.handleToggle = handleToggle.bind(this);
    this.decryptMsg = decryptMsg.bind(this);
  }

  checkEncrypt(){
    
    if (this.state.encrypted.length == 0){

      var msgToEncrypt = {
        sender: this.state.sender,
        date: parseDate(this.state.date),
        unencrypted: this.state.unencrypted
      }
      var passphrase = this.state.passphrase;

      this.postMsg(passphrase, msgToEncrypt);

    } else {
      const showDialog = this.state.encrypted;  
      this.setState({
        active: !this.state.active,
        showDialog
      });
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
      { label: 'CLOSE', onClick: this.handleToggle },
      { label: 'DECRYPT', onClick: this.decryptMsg },
    ];

    return (
      <div className="container">
        <form>
          <Input type='text' label='Name' name='name' value={this.state.sender} onChange={this.handleSender} />
  
          <Input 
            type='text' 
            label='Message' 
            name='message' 
            required={true}
            multiline 
            value={this.state.unencrypted} 
            onChange={this.handleMessage} 
            maxLength={120} />
  
          <DatePicker
            required={true}
            label='Expiration Date'
            sundayFirstDayOfWeek
            onChange={this.handleDate}
            value={this.state.date}
          />
          <div className="btn-container">
            <Button onClick={this.checkEncrypt} label="ENCRYPT" />
            <Button label="DECRYPT" />
          </div>
          
        </form>
   
        <nav>
          <Link href="#" label={`Your passphrase - ${this.state.passphrase}`} />
          <Link onClick={this.createNewPassphrase} href="#" label="Generate new Passphrase" />
        </nav>



        <Dialog
          actions={actions}
          active={this.state.active}
          title="De/Encrypt"
        >
          <Input 
            type='text' 
            label='Message' 
            name='message' 
            required={true}
            multiline 
            value={this.state.showDialog} 
            />

        </Dialog>

      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));