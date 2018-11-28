import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react";
// import Messages from "./messages";
import LogIn from "./login/LogIn"


export default class ApplicationViews extends Component {

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <React.Fragment>
        <Route path="/login" render={(props) => {
          return <LogIn {...props}/>}} />
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            // return <Messages  />
            console.log("credentials exist in session storage")
          } else {
            return <Redirect to="/login" />
          }
        }} />
      </React.Fragment>
    )
  }

}