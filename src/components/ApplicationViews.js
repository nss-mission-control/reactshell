import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Messages from "./messages"
import LogIn from "./login/LogIn"
import SignUp from "./login/SignUp"
import TaskDragging from "./tasks/TaskDragging"
import Friends from "./friends/Friends"
import EventsContainer from "./events/EventsContainer"
import NewsContainer from "./news/NewsContainer"

export default class ApplicationViews extends Component {

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Messages messages={this.props.data.messages} data={this.props.data} refresh={this.props.refresh} />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/tasks" render={(props) => {
          if (this.isAuthenticated()) {
            return <TaskDragging  {...props} tasks={this.props.tasks} />
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
            return <EventsContainer events={this.props.data.events} refresh={this.props.refresh} currentUser={this.props.data.currentUser}/>
          } else {
            return <LogIn {...props} activeUser={this.props.activeUser} />
          }
        }} />
        <Route exact path="/news" render={(props) => {
          if (this.isAuthenticated()) {
            return <NewsContainer {...props} news={this.props.data.articles} currentUser={this.props.data.currentUser} friends={this.props.data.friends} />
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