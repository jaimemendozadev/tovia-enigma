import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog';


class ShowDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ active: !this.state.active });
  }


  render() {
    const actions = [
      { label: 'CLOSE', onClick: this.handleToggle },
      { label: 'DECRYPT', onClick: this.handleToggle },
    ];

    return (
      <Dialog
        actions={actions}
        active={this.state.active}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title="My awesome dialog"
      />
    );
  }
}


export default ShowDialog;
