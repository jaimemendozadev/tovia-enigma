import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';
import styles from "../public/styles.css";




class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>Hello world!</h1>
        <Button className={`${styles.myButton}`} label="Hello Button!" />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));