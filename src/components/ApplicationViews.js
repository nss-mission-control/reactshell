import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Messages from "./messages"
import LogIn from "./login/LogIn"
import SignUp from "./login/SignUp"


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
        <Route exact path="/signup" render={(props) => {
          if (!this.isAuthenticated()) {
            return <SignUp activeUser={this.props.activeUser} refreshData={this.props.refreshData} login={this.props.login} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/login" render={(props) => {
          return <LogIn activeUser={this.props.activeUser} />
        }} />
      </React.Fragment>
    )
  }
}

  // Check if credentials are in local storage
//   isAuthenticated = () => sessionStorage.getItem("id") !== null

//   render() {
//     if (this.props.loggedIn) {
//       return (
//         <React.Fragment>
//           <Route exact path="/" render={(props) => {
//             return <Messages messages={this.props.messages} refresh={this.props.refresh} />
//           }} />
//         </React.Fragment>
//       )
//     } else {
//       return (
//         <React.Fragment>
//           <Route exact path="/signup" render={(props) => {
//             return <SignUp activeUser={this.props.activeUser} refreshData={this.props.refreshData} login={this.props.login} />
//           }} />
//           <Route exact path="/" render={(props) => {
//             return <LogIn activeUser={this.props.activeUser} />
//           }} />
//         </React.Fragment>
//       )
//     }
//   }
// }