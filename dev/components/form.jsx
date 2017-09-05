import React from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';

const Form = props => (
  <form>
    <h1>{"Tovia's Enigma"}</h1>
    <div className="avatar-container">
      <Avatar className="avatar">
        <img alt="" src="ic_account_circle_white_48dp_1x.png" />
      </Avatar>
      <Input
        className="nameInput"
        type="text"
        label="Name"
        name="name"
        value={props.sender}
        onChange={props.handleSender}
      />
    </div>

    <Input
      type="text"
      label="Message"
      name="message"
      required
      multiline
      value={props.unencrypted}
      onChange={props.handleMessage}
      maxLength={120}
    />

    <DatePicker
      required
      label="Expiration Date"
      sundayFirstDayOfWeek
      onChange={props.handleDate}
      value={props.date}
    />
    <div className="btn-container">
      <Button onClick={props.handleEncrypt} label="ENCRYPT" />

      <Button onClick={props.decryptMsg} label="DECRYPT" />
    </div>
  </form>
);

Form.propTypes = {
  sender: PropTypes.string.isRequired,
  handleSender: PropTypes.func.isRequired,
  unencrypted: PropTypes.string.isRequired,
  handleMessage: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  handleEncrypt: PropTypes.func.isRequired,
  decryptMsg: PropTypes.func.isRequired,
};


export default Form;
