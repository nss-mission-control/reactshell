import React, { Component } from 'react';
import { confirmAlert } from "react-confirm-alert";
import APIManager from "../../../modules/APIManager";
import "./OldMessages.css";
import $ from "jquery";

//FIXME: TODO: clicking edit button multiple times opens multiple edit fields

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
        return <section className="media" key={message.id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={message.user.profilePic} />
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
        return <section className="media" key={message.id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={message.user.profilePic} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
            <p><strong>{message.user.firstName}</strong> <small className="oldMsgTitle tag">{message.user.username}</small> <small className="oldMsgTitle tag">{moment(`${message.timeStamp}`).fromNow()}</small></p>
            <p className="oldMsgTitle">{message.messageContent}</p>
            </div>
          </div>
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
      <div className="top box">
        {this.printMessages()}
      </div>
    )
  }
}


// let userId = Number(sessionStorage.getItem("id"))
// if (message.user.id === userId) {
//   return <section className="level" key={message.id}>
//     <div className="level-left"></div>
//     <div className="level-right">
//       <p className={`oldMsgBody ${message.id}body level-item`}>{message.messageContent}</p>
//       <figure id="editDelete" className="level-item">
//         <img className="editIcon" id={parseInt(message.id)} onClick={this.editMessage} src="images/edit.png" alt="edit"></img>
//       </figure>
//       <figure className="image is-24x24">
//         <img src={message.user.profilePic} className="is-rounded" />
//       </figure> &nbsp;
//       <p id="dateInfo" className="tag level-item is-link">{message.user.username}</p>
//       <p id="dateInfo" className="tag level-item">{moment(`${message.timeStamp}`).fromNow()} </p>
//     </div>
//   </section>
// }
// else {
//   return <section className="level" key={message.id}>
//     <div className="level-left">
//       <div className="level-item is-flex">
//         <p className="oldMsgTitle tag">{moment(`${message.timeStamp}`).fromNow()}</p>
//         <figure className="image is-24x24">
//           <img src={message.user.profilePic} className="is-rounded" />
//         </figure> &nbsp;
//         <p className="oldMsgTitle tag is-link">{message.user.username}</p>
//       </div>
//       <p className="oldMsgTitle level-item">{message.messageContent}</p>
//     </div>
//     <div className="level-right"></div>
//   </section>
// }

{/* <article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-reply"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <button class="delete"></button>
  </div>
</article> */}