import React, { Component } from 'react';
// import MessageModular from "../modularMessage";
import { confirmAlert } from "react-confirm-alert";
import APIManager from "../../../modules/APIManager";
import "./OldMessages.css";

export default class OldMessages extends Component {

  deleteMessage = (event) => {
    APIManager.deleteItem("messages", event.id)
    .then(() => this.props.refresh())
  }

  saveMessage = (event) => {
    if (this.content.value !== "") {
      event.messageContent = this.content.value;
    }
    // let messageContent = {messageContent: this.content.value}
    APIManager.updateItem("messages", event.id, event)
    .then(() => this.props.refresh())
  }

  editMessage = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        // event.target.id = parseInt(event.target.id);
        let tempId = parseInt(event.target.id);
        let thisMessage = this.props.messages.filter(message => message.id === tempId);
        thisMessage = thisMessage[0];
        thisMessage = { id: thisMessage.id, messageContent: thisMessage.messageContent, timeStamp: thisMessage.timeStamp, userId: thisMessage.userId }
        return (
          <div className="messageEdit box container">
            <div className="control">
              <p className="alert hide" id="noMessageContent">Message Details</p>
              <input className="input" defaultValue={thisMessage.messageContent} ref={content => this.content = content} />
            </div>
            <div id="editMessageBtns" className="buttons">
              <button className="messageButton button" onClick={() => {
                onClose()
              }}>Back to Messages</button>
              <button className="messageButton button" onClick={() => {
                this.saveMessage(thisMessage);
                onClose()
              }}>Save Message Changes</button>
              <button className="messageButton button" onClick={() => {
                this.deleteMessage(thisMessage)
                onClose()
              }}>Delete Message</button>
            </div>
          </div>
        )
      }
    })
  }

  printMessages = () => {
    let moment = require('moment');
    let messages = this.props.messages;
    if (messages.length > 1) {
      this.props.messages.sort(function (a, b) {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      });
    }
    return (this.props.messages.map(message => {
      // TODO: need to add ability to read current user id
      if (message.user.username === "braddavistech") {
        return <section className="level" key={message.id}>
          <div className="level-left">
            <p id="dateInfo" className="tag">{moment(`${message.timeStamp}`).fromNow()} </p>
            <article id="editDelete">
              <img className="editIcon" id={parseInt(message.id)} onClick={this.editMessage} src="../../../../edit.png" alt="edit"></img>
            </article>
          </div>
          <p className={`oldMsgBody ${message.id}body level-right`}>{message.messageContent}</p>
        </section>
      }
      else {
        return <section className="level" key={message.id}>
          <div className="level-left">
            <p className="oldMsgTitle">{message.user.username} - {moment(`${message.timeStamp}`).fromNow()}</p>
            <p className="oldMsgTitle">{message.messageContent}</p>
          </div>
        </section>
      }
    }
    ))
  }



  render() {
    return (
      <div className="top container box">
        {this.printMessages()}
      </div>
    )
  }
}