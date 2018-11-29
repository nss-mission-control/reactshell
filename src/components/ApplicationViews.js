import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react";
import Messages from "./messages";
import LogIn from "./login/LogIn"


export default class ApplicationViews extends Component {

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Messages messages={this.props.messages} refresh={this.props.refresh} />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
      </React.Fragment>
    )
  }
}