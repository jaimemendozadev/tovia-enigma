import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import styles from '../public/styles.css';
import axios from 'axios';
import ShowDialog from './ShowDialog.jsx';
const {generatePassphrase, parseDate} = require('./utils.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      unencrypted: '',
      encrypted: '',
      date: '',
      passphrase: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.checkEncrypt = this.checkEncrypt.bind(this);
  }

  handleName(event){
    this.setState({
      name: event
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
    console.log("Inside checkEncrypt")
    if (this.state.encrypted.length == 0){
      console.log("making axios post");
      var msgToEncrypt = {
        passphrase: this.state.passphrase,
        date: parseDate(this.state.date),
        unencrypted: this.state.unencrypted
      }

      axios.post('http://localhost:3000/api/encrypt', msgToEncrypt)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  componentDidMount() {
    this.setState({
      passphrase: generatePassphrase()
    });
  }

  render(){
    return (
      <div className="container">
        <form>
          <Input type='text' label='Name' name='name' value={this.state.name} onChange=  {this.handleName} />
  
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
          <Link href="#" label="Generate new Passphrase" />
        </nav>

      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));