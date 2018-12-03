import React, { Component } from 'react';
// import "./IndividualDetails.css";

export default class IndividualDetails extends Component {

  render () {
    return (
      <div id="userDetailsContainer">
        <img src={this.props.user.profilePic} id="indivUserModularPic" alt="Profile"></img>
        <p id="indivUserName">{this.props.user.username}</p>
        <p className="indivUserModularDetails">{this.props.user.firstName} {this.props.user.lastName}</p>
        <a href={`mailto:${this.props.user.email}`} id="indivUserModularEmail">{this.props.user.email}</a>
      </div>
    )
  }
}