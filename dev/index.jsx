import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Snackbar} from 'react-toolbox'
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import styles from '../public/styles.css';
import axios from 'axios';
const {generatePassphrase, handleSender, handleMessage, handleDate, postMsg, handleClose, decryptMsg, handleDialogInput, createNewPassphrase, handleSnackbarTimeout} = require('./utils.js');

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
    this.handleSender = handleSender.bind(this);
    this.handleMessage = handleMessage.bind(this);
    this.handleDate = handleDate.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
    this.postMsg = postMsg.bind(this);

    this.createNewPassphrase = createNewPassphrase.bind(this);
    this.handleClose = handleClose.bind(this);
    this.decryptMsg = decryptMsg.bind(this);
    this.handleDialogInput = handleDialogInput.bind(this);
    this.handleSnackbarTimeout = handleSnackbarTimeout.bind(this);
  }

  handleEncrypt(){
    if(this.state.sender.length == 0 || !this.state.date || this.state.unencrypted.length == 0){
      this.setState({
        showSnackbar: true
      });
      return;
      
    }
    
    if (this.state.encrypted.length == 0){

      var msgToEncrypt = {
        sender: this.state.sender,
        date: this.state.date,
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
      { label: 'CLOSE', onClick: this.handleClose },
      { label: 'DECRYPT', onClick: this.decryptMsg },
    ];

    return (
      <div className="container">
        <form>

          <div className="avatar-container">
          <Avatar className="avatar"><img src="https://placeimg.com/80/80/animals"/></Avatar>
          <Input type='text' label='Name' name='name' value={this.state.sender} onChange={this.handleSender} />
          </div>
  
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
            required
            label='Expiration Date'
            sundayFirstDayOfWeek
            onChange={this.handleDate}
            value={this.state.date}
          />
          <div className="btn-container">
            <Button onClick={this.handleEncrypt} label="ENCRYPT" />
            
            { /*MUST CREATE onClick CB FOR THIS BUTTON*/ }
            <Button label="DECRYPT" />
          </div>
          
        </form>
   
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
            type='text' 
            label='Message' 
            name='message' 
            multiline 
            value={this.state.showDialog}
            onChange={this.handleDialogInput} 
            />

        </Dialog>

        <section>
        <Snackbar
          active={this.state.showSnackbar}
          label="You're message is missing something. Please fill out the form entirely."
          timeout={3500}
          onTimeout={this.handleSnackbarTimeout}
        />
        </section>

      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));