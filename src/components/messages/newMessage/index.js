import React, { Component } from 'react';
import $ from "jquery";
import APIManager from "../../../modules/APIManager";
import "./NewMessage.css";

export default class NewMessage extends Component {
  state = {
    messageContent: ""
  }

  saveMessage = () => {
    $(".alert").hide()
    let timeStampNew = new Date();
    if (this.state.messageContent === "") {
      $("#noMessageContent").show();
    } else {
      let userId = Number(sessionStorage.getItem("id"))
      let data = {timeStamp: timeStampNew, messageContent: this.state.messageContent, userId: userId}
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
      <h1 className="addMessageTitle">Add A New Message</h1>
        <p className="alert hide" id="noMessageContent">Please add a message before saving.</p>
        <input className="input" value={this.state.messageContent} id="messageValue" onChange={this.handleChange} placeholder="Enter your message here" ref={info => this.messageContent = info} />
        <button className="messageButton button" onClick={this.saveMessage}>Save Message</button>
      </div>
    )
  }

  render() {
    return (
      <div className="bottom box">
        {this.createNewMessage()}
      </div>
    )
  }
}