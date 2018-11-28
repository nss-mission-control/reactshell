import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react";
// import Messages from "./messages";
import Login from "./login/LogIn"


export default class ApplicationViews extends Component {

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            // return <Messages  />
          } else {
            return <Redirect to="/login" />
          }
        }} />
      </React.Fragment>
    )
  }

}