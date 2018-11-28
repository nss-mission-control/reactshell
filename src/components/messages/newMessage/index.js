import React, { Component } from 'react';
import $ from "jquery";

export default class NewMessage extends Component {

  saveMessage = () => {
    $(".alert").hide();
    if(this.messagesContent.value === "") {
      $("#noMessageContent").show();
    }
  }

  createNewMessage = () => {

    return (
      <div class="control">
        <p className="alert hide" id="noMessageContent">Please add a message before saving.</p>
        <input class="input" ref={(userInput) => this.messageContent =
              userInput}/>
      </div>
    )
  }

  render() {
    return (
      <div className="top">
        <p>Bottom</p>
      </div>
    )
  }
}