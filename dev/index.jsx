import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import styles from "../public/styles.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      date: '',
    }
    this.handleName = this.handleName.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleName(event){
    this.setState({
      name: event.target.value
    });
  }
  
  handleDate(date){
    console.log("the something is ", JSON.stringify(date));
    this.setState({
      date
    });
  }

  render(){
    return (
      <form>
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleName} />

        <Input type='text' label='Message' name='message' required={true} value={this.state.name} maxLength={120} />

        <DatePicker
          required={true}
          label='Expiration Date'
          sundayFirstDayOfWeek
          onChange={this.handleDate}
          value={this.state.date}
        />
        
      </form>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));