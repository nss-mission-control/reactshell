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

  blurPage = () => {
    $(".navbar").addClass("isBlurred");
    $(".top").addClass("isBlurred");
    $(".bottom").addClass("isBlurred");
  }

  unblurPage() {
    $(".navbar").removeClass("isBlurred");
    $(".top").removeClass("isBlurred");
    $(".bottom").removeClass("isBlurred");
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
        this.blurPage();
        this.setState({editting: true})
        let tempId = parseInt(event.target.id);
        let thisMessage = this.props.messages.filter(message => message.id === tempId);
        thisMessage = thisMessage[0];
        thisMessage = { id: thisMessage.id, profilePic: thisMessage.user.profilePic, messageContent: thisMessage.messageContent, timeStamp: thisMessage.timeStamp, userId: thisMessage.userId }
        return (
          <div className="messageEdit box">
            <div className="control">
              <p className="editMessageHeader" id="noMessageContent">Message Details</p>
              <img className="editMessageProfilePic" src={thisMessage.profilePic} alt="profile pic" />
              <p className="editMessageTitleDescription">Message Content</p>
              <input className="input" defaultValue={thisMessage.messageContent} ref={content => this.content = content} />
            </div>
            <div id="editMessageBtns" className="buttons">
              <button className="messageButton button" onClick={() => {
                this.unblurPage();
                onClose();
              }}>Back to Messages</button>
              <button className="messageButton button" onClick={() => {
                this.saveMessage(thisMessage);
                this.unblurPage();
                onClose();
              }}>Save Message Changes</button>
              <button className="messageButton button" onClick={() => {
                this.deleteMessage(thisMessage);
                this.unblurPage();
                onClose();
              }}>Delete Message</button>
            </div>
          </div>
        )
      }
    })
  }

  saveFriend = (newFriend) => {
    let currentUser = parseInt(sessionStorage.getItem("id"));
    let newRelationship = {
      request_userId: currentUser, userId: newFriend
    }
    APIManager.saveItem("friends", newRelationship)
    .then (() => this.props.refresh())
  }

  printMessages = () => {
    let currentUser = parseInt(sessionStorage.getItem("id"));
    let currentFriends = [];
    this.props.data.friends.forEach(person => {
      if (person.request_userId === currentUser) {
        if (currentFriends.indexOf(person.userId) === -1) {
          currentFriends.push(person.userId)
        }
      }
    })
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
        return <section className="media" key={message.id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={message.user.profilePic} alt=""/>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p id="dateInfo" className=""><strong>{message.user.firstName}</strong> <small className="tag is-link">@{message.user.username}</small> <small className="tag is-link">{moment(`${message.timeStamp}`).fromNow()}</small></p>
              <p className={`oldMsgBody ${message.id}body`}>{message.messageContent}</p>
            </div>
          </div>
          <div className="media-right">
            <figure id="editDelete" >
              <img className="editIcon" id={parseInt(message.id)} onClick={this.editMessage} src="images/edit.png" alt="edit"></img>
            </figure>
          </div>
        </section>
      } else {
        if (currentFriends.indexOf(message.userId) === -1) {
        return <section className="media" key={message.id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={message.user.profilePic} alt=""/>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p><strong>{message.user.firstName}</strong> <small className="oldMsgTitle tag">@{message.user.username}</small> <small className="oldMsgTitle tag">{moment(`${message.timeStamp}`).fromNow()}</small><button className="button is-small is-outlined is-link addToFollowingBtn" onClick={() => this.saveFriend(message.userId)}>Follow {message.user.username}</button></p>
              <p className="oldMsgTitle">{message.messageContent}</p>
            </div>
          </div>
        </section>
      } else {
        return <section className="media" key={message.id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={message.user.profilePic} alt=""/>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p><strong>{message.user.firstName}</strong> <small className="oldMsgTitle tag">@{message.user.username}</small> <small className="oldMsgTitle tag">{moment(`${message.timeStamp}`).fromNow()}</small></p>
              <p className="oldMsgTitle">{message.messageContent}</p>
            </div>
          </div>
        </section>
      }
    }
    }
    ))
  }

  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".navbar").removeClass("isBlurred");
        $(".top").removeClass("isBlurred");
        $(".bottom").removeClass("isBlurred");
      }
    });
    return (
      <div className="top box">
        {this.printMessages()}
      </div>
    )
  }
}