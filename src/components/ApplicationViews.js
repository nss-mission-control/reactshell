import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Messages from "./messages"
import LogIn from "./login/LogIn"
import SignUp from "./login/SignUp"
import Tasks from "./tasks/Tasks"
import Friends from "./friends/Friends"
import Events from "./events/Events"
import News from "./news/News"

export default class ApplicationViews extends Component {

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Messages messages={this.props.data.messages} refresh={this.props.refresh} />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/tasks" render={(props) => {
          if (this.isAuthenticated()) {
            return <Tasks />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
            return <Events />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/news" render={(props) => {
          if (this.isAuthenticated()) {
            return <News />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/following" render={(props) => {
          if (this.isAuthenticated()) {
            return <Friends data={this.props.data} refresh={this.props.refresh}/>
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