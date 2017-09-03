import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import DatePicker from 'react-toolbox/lib/date_picker';
import styles from "../public/styles.css";
const {generatePassphrase} = require('./utils.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      msg: '',
      date: '',
      passphrase: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleName(event){
    this.setState({
      name: event.target.value
    });
  }

  handleMessage(msg){
    console.log("the msg is ", msg);

    this.setState({
      msg
    });
  }
  
  handleDate(date){
    var parsedDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    console.log("parsedDate is ", parsedDate);
    this.setState({
      date: parsedDate
    });
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
            multiline={true} 
            value={this.state.msg} 
            onChange={this.handleMessage} 
            maxLength={120} />
  
          <DatePicker
            required={true}
            label='Expiration Date'
            sundayFirstDayOfWeek
            onChange={this.handleDate}
            value={this.state.date}
          />
          
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