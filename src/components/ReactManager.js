import React, { Component } from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';
import APIManager from "../modules/APIManager";

export default class ReactManager extends Component {
  state = {
    pageLoaded: false,
    loggedIn: false,
    currentUser: {}
  }

  // function is passed to login.js. On login, currentUser is set in state and
  // currentUser is passed to navBar to append username on right side
  activeUser = (user) => {
    this.setState({ currentUser: user, loggedIn: true })
  }

  login = () => {
    this.setState({ loggedIn: true })
  }

  logoutUser = () => {
    sessionStorage.removeItem("id")
    this.setState({ currentUser: {}, loggedIn: false })
  }

  componentDidMount = () => {
    this.refreshData()
  }

  refreshData = () => {
    APIManager.getAllCategory("messages/?_expand=user").then(data => { this.setState({ messages: data }) })
      .then(() => APIManager.getAllCategory("users").then(data => { this.setState({ users: data }) }))
      .then(() => APIManager.getAllCategory("articles/?_expand=user").then(data => { this.setState({ articles: data }) }))
      .then(() => APIManager.getAllCategory("events/?_expand=user").then(data => { this.setState({ events: data }) }))
      .then(() => APIManager.getAllCategory("tasks/?_expand=user").then(data => { this.setState({ tasks: data }) }))
      .then(() => APIManager.getAllCategory("friends/?_expand=user").then(data => { this.setState({ friends: data }) }))
      .then(() => {
        let userId = Number(sessionStorage.getItem("id"))
        this.state.users.forEach(user => {
          if (user.id === userId) {
            this.setState({ currentUser: user })
          }
        })
      })
      .then(() => this.setState({ pageLoaded: true }))
  }

  render() {
    if (this.state.pageLoaded) {
      return (
        <React.Fragment>
          <NavBar user={this.state.currentUser} logout={this.logoutUser} activeUser={this.activeUser} currentUser={this.state.currentUser} refresh={this.refreshData} />
          <ApplicationViews refresh={this.refreshData} activeUser={this.activeUser} login={this.login} loggedIn={this.state.loggedIn} data={this.state} />
        </React.Fragment>
      )
    } else {
      return (
        <div>
          Page is loading.....
        </div>
      )
    }
  }
}
