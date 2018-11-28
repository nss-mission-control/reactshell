import React, { Component } from 'react';
import OldMessages from "./oldMessages";
import NewMessage from "./newMessage";

export default class Messages extends Component {

  render() {
    return (
      <div className="container">
        {OldMessages}
        {NewMessage}
      </div>
    )
  }
}