import React, { Component } from 'react';
import { confirmAlert } from "react-confirm-alert";
import APIManager from "../../../modules/APIManager";
import "./OldMessages.css";
import $ from "jquery";

export default class OldMessages extends Component {

  deleteMessage = (event) => {
    APIManager.deleteItem("messages", event.id)
      .then(() => this.props.refresh())
  }

  saveMessage = (event) => {
    if (this.content.value !== "") {
      event.messageContent = this.content.value;
    }
    APIManager.updateItem("messages", event.id, event)
      .then(() => this.props.refresh())
  }

  editMessage = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
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
      let userId = Number(sessionStorage.getItem("id"))
      if (message.user.id === userId) {
        return <section className="level" key={message.id}>
          <div className="level-left"></div>
          <div className="level-right">
            <p className={`oldMsgBody ${message.id}body level-item`}>{message.messageContent}</p>
            <figure id="editDelete" className="level-item">
              <img className="editIcon" id={parseInt(message.id)} onClick={this.editMessage} src="images/edit.png" alt="edit"></img>
            </figure>
            <figure className="image is-24x24">
              <img src={message.user.profilePic} className="is-rounded" />
            </figure> &nbsp;
            <p id="dateInfo" className="tag level-item is-link">{message.user.username}</p>
            <p id="dateInfo" className="tag level-item">{moment(`${message.timeStamp}`).fromNow()} </p>
          </div>
        </section>
      }
      else {
        return <section className="level" key={message.id}>
          <div className="level-left">
            <div className="level-item is-flex">
              <p className="oldMsgTitle tag">{moment(`${message.timeStamp}`).fromNow()}</p>
              <figure className="image is-24x24">
                <img src={message.user.profilePic} className="is-rounded" />
              </figure> &nbsp;
              <p className="oldMsgTitle tag is-link">{message.user.username}</p>
            </div>
            <p className="oldMsgTitle level-item">{message.messageContent}</p>
          </div>
          <div className="level-right"></div>
        </section>
      }
    }
    ))
  }

  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".followingThem").removeClass("isBlurred")
        $(".followingMe").removeClass("isBlurred")
        $(".needToFollow").removeClass("isBlurred")
      }
    });
    return (
      <div className="top container box">
        {this.printMessages()}
      </div>
    )
  }
}