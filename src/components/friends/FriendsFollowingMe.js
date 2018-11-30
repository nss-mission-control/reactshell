import React, { Component } from "react";
import "./FriendsDetails.css";
import { confirmAlert } from "react-confirm-alert";
import IndividualDetails from "./FriendsModular";
import APIManager from "../../modules/APIManager";
import $ from "jquery";

export default class FriendFollowingMePrint extends Component {

  showUserDetails = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        let canFollow = true;
        let relationship = 0;
        let currentUser = 2;
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
        if (canFollow) {
          // TODO: will need if else statement to display this if user is already following to unfollow
          return (
            <div className="detailsModularContainer">
              <IndividualDetails user={thisUser} />
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
              </div>
            </div>
          )
        } else {
          // TODO: will need if else statement to display this if user is already following to unfollow
          return (
            <div className="detailsModularContainer">
              <IndividualDetails user={thisUser} />
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
      if (currentUserId === person.userId) {
        let thisPerson = this.props.data.users.find(check => check.id === person.request_userId)
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


  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".followingThem").removeClass("isBlurred")
        $(".followingMe").removeClass("isBlurred")
        $(".needToFollow").removeClass("isBlurred")
      }
    });

    let tempFriend = this.sortUsers()
    return (
      <div className="followingMe">
        <h1 className="followingTitles">People Following Me</h1>
        <div className="userToAdd">
          {tempFriend}
        </div>
      </div>
    )
  }
}