import React, { Component } from "react";
import "./FriendsDetails.css";
import { confirmAlert } from "react-confirm-alert";
import IndividualDetails from "./FriendsModular";
import APIManager from "../../modules/APIManager";
import $ from "jquery";

export default class FriendIFollowPrint extends Component {
  state = {
    following: []
  }

  userMessagesDetails = (id) => {
    // TODO: need to add functionality to pull from setStorage
    let moment = require('moment');
    this.props.data.messages.forEach(message => {
      if (id === message.userId) {
        return (
          <div className="messageDetailsFollow">
            <p id="dateInfo"> {moment(`${message.timeStamp}`).fromNow()} </p>
            <p className="messageDetailsFollowContent">{message.messageContent}</p>
          </div>
        )
      }
    })
  }

  showUserDetails = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        let canFollow = true;
        let moment = require('moment');
        let relationship = 0;
        let currentUser = 2;
        let thisUserMessages = [];
        let thisUserArticles = [];
        $(".followingThem").addClass("isBlurred")
        $(".followingMe").addClass("isBlurred")
        $(".needToFollow").addClass("isBlurred")
        let tempId = parseInt(event.target.id);
        let thisUser = {};
        this.props.data.users.forEach(user => {
          if (user.id === tempId) {
            thisUser = user;
            return thisUser;
          }
        });
        this.props.data.friends.forEach(friend => {
          if (friend.request_userId === currentUser) {
            if (friend.userId === tempId) {
              canFollow = false;
              relationship = friend.id;
              return { canFollow, relationship };
            }
          }
        })
        this.props.data.messages.forEach(message => {
          if (thisUser.id === message.userId) {
            thisUserMessages.push(message);
          }
        })
        this.props.data.articles.forEach(article => {
          if (thisUser.id === article.userId) {
            thisUserArticles.push(article);
          }
        })

        if (canFollow) {
          // TODO: will need if else statement to display this if user is already following to unfollow
          return (
            <div className="detailsModularContainer">
              <IndividualDetails user={thisUser} data={this.props.data} />
              <div id="detailsModularBtnsSection">
                <button className="modularButton" onClick={() => {
                  $(".followingThem").removeClass("isBlurred")
                  $(".followingMe").removeClass("isBlurred")
                  $(".needToFollow").removeClass("isBlurred")
                  onClose()
                }}>Back to Following</button>
                <button className="modularButton" onClick={() => {
                  // TODO: Need to replace currentUser with id for current user for saving
                  let currentUser = 2;
                  let data = { request_userId: currentUser, userId: thisUser.id }
                  APIManager.saveItem("friends", data).then(() => this.props.refresh())
                  $(".followingThem").removeClass("isBlurred")
                  $(".followingMe").removeClass("isBlurred")
                  $(".needToFollow").removeClass("isBlurred")
                  onClose()
                }}>Follow {thisUser.username}</button>
                <h1 className="userMessagesTitle">Messages from {thisUser.username}</h1>
                {
                  thisUserMessages.map(message => {
                    return (
                      <div className="messageDetailsFollow" key={message.id}>
                        <p className="dateInfo">Added {moment(`${message.timeStamp}`).fromNow()} </p>
                        <p className="messageDetailsFollowContent">{message.messageContent}</p>
                      </div>
                    )
                  })
                }
                 <h1 className="userMessagesTitle">Articles from {thisUser.username}</h1>
                {
                  thisUserArticles.map(article => {
                    return (
                      <div className="messageDetailsFollow" key={article.id}>
                      <a href={article.url} target="blank" className="articleLinkDetails"><img src={article.articleImage} alt="New Story" className="articleImageDetails"></img> </a>
                        <p className="dateInfo">Added {moment(`${article.dateSaved}`).fromNow()} </p>
                        <p className="messageDetailsFollowContent">{article.articleName}</p>
                        <p className="messageDetailsFollowContentAbout">{article.about}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        } else {
          // TODO: will need if else statement to display this if user is already following to unfollow
          return (
            <div className="detailsModularContainer">
              <IndividualDetails user={thisUser} data={this.props.data} />
              <div id="detailsModularBtnsSection">
                <button className="modularButton" onClick={() => {
                  $(".followingThem").removeClass("isBlurred")
                  $(".followingMe").removeClass("isBlurred")
                  $(".needToFollow").removeClass("isBlurred")
                  onClose()
                }}>Back to Following</button>
                <button className="modularButton" onClick={() => {
                  // TODO: Need to replace currentUser with id for current user for saving
                  APIManager.deleteItem("friends", relationship).then(() => this.props.refresh())
                  $(".followingThem").removeClass("isBlurred")
                  $(".followingMe").removeClass("isBlurred")
                  $(".needToFollow").removeClass("isBlurred")
                  onClose()
                }}>Stop Following {thisUser.username}</button>
              </div>
              <h1 className="userMessagesTitle">Messages from {thisUser.username}</h1>
                {
                  thisUserMessages.map(message => {
                    return (
                      <div className="messageDetailsFollow" key={message.id}>
                        <p className="dateInfo">Added {moment(`${message.timeStamp}`).fromNow()} </p>
                        <p className="messageDetailsFollowContent">{message.messageContent}</p>
                      </div>
                    )
                  })
                }
                 <h1 className="userMessagesTitle">Articles from {thisUser.username}</h1>
                {
                  thisUserArticles.map(article => {
                    return (
                      <div className="messageDetailsFollow" key={article.id}>
                      <a href={article.url} target="blank" className="articleLinkDetails"><img src={article.articleImage} alt="New Story" className="articleImageDetails"></img> </a>
                        <p className="dateInfo">Added {moment(`${article.dateSaved}`).fromNow()} </p>
                        <p className="messageDetailsFollowContent">{article.articleName}</p>
                        <p className="messageDetailsFollowContentAbout">{article.about}</p>
                      </div>
                    )
                  })
                }
            </div>
          )
        }
      }
    })
  }

  sortUsers = () => {
    // TODO: Current user needs changed from hard coded to currentUser from state
    let currentUserId = 2;
    let followingList = [];
    this.props.data.friends.forEach(person => {
      if (currentUserId === person.request_userId) {
        let thisPerson = person.user;
        followingList.push(thisPerson);
      }
    });
    return (followingList.map(person => {
      return (
        <div className="indivUser" key={person.id} >
          <section className="tagline" id={person.id} onClick={this.showUserDetails}>
            <img src={person.profilePic} id={person.id} className="followerImage" alt="Follower"></img>
            <p className="followerUsername" id={person.id} >{person.username}</p>
          </section>
        </div>
      )
    })
    )
  }

  newToFollow = () => {
    let currentUserId = 2;
    let toFollowList = [];
    let followingList = [];
    this.props.data.friends.forEach(person => {
      if (currentUserId === person.request_userId) {
        let thisPerson = person.userId;
        followingList.push(thisPerson);
      }
    });

    this.props.data.users.forEach(person => {
      if (followingList.indexOf(person.id) === -1 && person.id !== currentUserId) {
        toFollowList.push(person);
      }
    });
    return (toFollowList.map(person => {
      return (
        <div className="indivUser" key={person.id} >
          <section className="tagline" id={person.id} onClick={this.showUserDetails}>
            <img src={person.profilePic} id={person.id} className="followerImage" alt="Follower"></img>
            <p className="followerUsername" id={person.id} >{person.username}</p>
          </section>
        </div>
      )
    })
    )
  }


  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".followingThem").removeClass("isBlurred")
        $(".followingMe").removeClass("isBlurred")
        $(".needToFollow").removeClass("isBlurred")
      }
    });
    let tempFriend = this.sortUsers()
    let availableFriend = this.newToFollow()
    return (
      <div>
        <div className="followingThem">
          <section>
            <h1 className="followingTitles">People I Follow</h1>
          </section>
          <div className="userToAdd">
            {tempFriend}
          </div>
        </div>
        <div className="needToFollow">
          <h1 className="followingTitles">Start Following</h1>
          <div className="userToAdd">
            {availableFriend}
          </div>
        </div>
      </div>
    )
  }
}