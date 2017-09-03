import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import styles from "../public/styles.css";




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      name: event.target.value
    });
  }

  render(){
    return (
      <form>
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange} />

        <Input type='text' label='Message' name='message' required='true' value={this.state.name} maxLength={120} />

        <DatePicker
          label='Formatted Date'
          autoOk
          inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
          onChange={this.handleChange.bind(this, 'date3')}
          value={this.state.date3}
          sundayFirstDayOfWeek
        />
        
      </form>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));