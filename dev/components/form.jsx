import React from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';

const Form = props => (
  <form>
    <div className="avatar-container">
      <Avatar className="avatar">
        <img src="https://placeimg.com/80/80/animals" />
      </Avatar>
      <Input
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

export default Form;
