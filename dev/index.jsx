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
        <form>

          <div className="avatar-container">
          <Avatar className="avatar"><img src="https://placeimg.com/80/80/animals"/></Avatar>
          <Input type='text' label='Name' name='name' value={this.state.sender} onChange={handleSender.bind(this)} />
          </div>
  
          <Input 
            type='text' 
            label='Message' 
            name='message' 
            required={true}
            multiline 
            value={this.state.unencrypted} 
            onChange={handleMessage.bind(this)} 
            maxLength={120} />
  
          <DatePicker
            required
            label='Expiration Date'
            sundayFirstDayOfWeek
            onChange={handleDate.bind(this)}
            value={this.state.date}
          />
          <div className="btn-container">
            <Button onClick={handleEncrypt.bind(this)} label="ENCRYPT" />
            
            { /*MUST CREATE onClick CB FOR THIS BUTTON*/ }
            <Button label="DECRYPT" />
          </div>
          
        </form>
   
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