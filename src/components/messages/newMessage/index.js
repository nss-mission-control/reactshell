import React, { Component } from 'react';
import $ from "jquery";
import APIManager from "../../../modules/APIManager";
import "./NewMessage.css";

export default class NewMessage extends Component {
  state = {
    messageContent: ""
  }

  saveMessage = () => {
    // need to add ability to grab current user id
    $(".alert").hide()
    let timeStampNew = new Date();
    if (this.state.messageContent === "") {
      $("#noMessageContent").show();
    } else {
      // TODO: need to add functionality to save to specific user
      let data = {timeStamp: timeStampNew, messageContent: this.state.messageContent, userId: 4}
      APIManager.saveItem("messages", data)
      .then(() => this.props.refresh())
      this.setState({messageContent: ""})
    }
  }

  handleChange = (event) => {
    this.setState({messageContent: this.messageContent.value})
  }

  createNewMessage = () => {
    return (
      <div className="control">
      <h1 className="">Add A New Message</h1>
        <p className="alert hide" id="noMessageContent">Please add a message before saving.</p>
        <input className="input" value={this.state.messageContent} id="messageValue" onChange={this.handleChange} placeholder="Enter your message here" ref={info => this.messageContent = info} />
        <button className="messageButton" onClick={this.saveMessage}>Save Message</button>
      </div>
    )
  }

  render() {
    return (
      <div className="bottom">
        {this.createNewMessage()}
      </div>
    )
  }
}