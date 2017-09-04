import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import styles from '../public/styles.css';
import axios from 'axios';
import ShowDialog from './ShowDialog.jsx';
const {generatePassphrase, parseDate} = require('./utils.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sender: '',
      unencrypted: '',
      encrypted: '',
      date: '',
      passphrase: '',
      active: false
    }
    this.handleSender = this.handleSender.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.checkEncrypt = this.checkEncrypt.bind(this);
    this.createNewPassphrase = this.createNewPassphrase.bind(this);
  }

  handleSender(event){
    this.setState({
      sender: event
    });
  }

  handleMessage(msg){
    console.log("the msg is ", msg);
    this.setState({
      unencrypted: msg
    });
  }
  
  handleDate(date){
    this.setState({
      date: date
    });
  }

  checkEncrypt(){
    console.log(`this.state.encrypted is ${this.state.encrypted}`)
    if (this.state.encrypted.length == 0){

      var msgToEncrypt = {
        sender: this.state.sender,
        date: parseDate(this.state.date),
        unencrypted: this.state.unencrypted
      }
      var passphrase = this.state.passphrase;


      axios.post(`http://localhost:3000/api/encrypt/${passphrase}`, msgToEncrypt)
        .then(res => {
          console.log(res);
          this.setState({
            encrypted: res.data
          });
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      this.setState({
        active: !this.state.active
      });
    }
    
    
  }

  createNewPassphrase(event){
    event.preventDefault();
    this.setState({
      passphrase: generatePassphrase()
    });
  }

  componentDidMount() {
    this.setState({
      passphrase: generatePassphrase()
    });
  }

  

  render(){
    const actions = [
      { label: 'CLOSE', onClick: this.handleToggle },
      { label: 'DECRYPT', onClick: this.handleToggle },
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
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="My awesome dialog"
        />

      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));