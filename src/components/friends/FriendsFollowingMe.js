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
        $("#root").addClass("isBlurred")
        let tempId = parseInt(event.target.id);
        let thisUser = {};
        console.log("this.props.users", this.props.data.users)
        console.log("tempId", tempId)
        this.props.data.users.forEach(user => {
          if (user.id === tempId) {
            thisUser = user;
            return thisUser;
          }
        });
        // thisMessage = thisMessage[0];
        console.log("thisMessage", thisUser)
        // TODO: will need if else statement to display this if user is already following to unfollow
        return (
          <div className="detailsModularContainer">
          <IndividualDetails user={thisUser} />
            <div id="detailsModularBtnsSection">
              <button className="modularButton" onClick={() => {
                $("#root").removeClass("isBlurred")
                onClose()
              }}>Back to Messages</button>
              <button className="modularButton" onClick={() => {
                // TODO: Need to replace currentUser with id for current user for saving
               let currentUser = 2;
               let data = {request_userId: currentUser, userId: thisUser.id}
               APIManager.saveItem("friends", data).then (() => this.props.refresh())
               $("#root").removeClass("isBlurred")
                onClose()
              }}>Follow {thisUser.username}</button>
            </div>
          </div>
        )
        // else {
        //   return (
        //     <div className="detailsModularContainer">
        //     <IndividualDetails user={thisUser} />
        //       <div id="detailsModularBtnsSection">
        //         <button className="modularButton" onClick={() => {
        //           $("#root").removeClass("isBlurred")
        //           onClose()
        //         }}>Back to Messages</button>
        //         <button className="modularButton" onClick={() => {
        //           // TODO: Need to replace currentUser with id for current user for saving
        //          APIManager.deleteItem("friends", data).then (() => this.props.refresh())
        //          $("#root").removeClass("isBlurred")
        //           onClose()
        //         }}>Unfollow {thisUser.username}</button>
        //       </div>
        //     </div>
        //   )
        // }
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
  let tempFriend = this.sortUsers()
  console.log(this.props.data.friends)
  console.log("tempFriend():", this.sortUsers())
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