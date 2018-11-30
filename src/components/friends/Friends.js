import React, { Component } from "react";
import FriendIFollowPrint from "./FriendsFollowedDetails";
import FriendFollowingMePrint from "./FriendsFollowingMe";

export default class Friends extends Component {

  render () {
    return (
      <React.Fragment>
          <FriendIFollowPrint data={this.props.data} refresh={this.props.refresh} />
          <FriendFollowingMePrint data={this.props.data} refresh={this.props.refresh}/>
      </React.Fragment>
      )
  }
}

