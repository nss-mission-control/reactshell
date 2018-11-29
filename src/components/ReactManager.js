import React, { Component } from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';
import APIManager from "../modules/APIManager";

export default class ReactManager extends Component {
  state = {
    pageLoaded: false,
    activeUser: false,
    currentUser: {}
  }

  // function is passed to login.js. On login, currentUser is set in state and
  // currentUser is passed to navBar to append username on right side
  activeUser = (user) => {
    this.setState({ currentUser: user })
  }

  logoutUser = () => {
    sessionStorage.removeItem("id")
    this.setState({currentUser: {}})
  }

  componentDidMount = () => {
    this.refreshData();
  }

  refreshData = () => {
    APIManager.getAllCategory("messages/?_expand=user").then(data => { this.setState({ messages: data }) })
      .then(() => APIManager.getAllCategory("users").then(data => { this.setState({ users: data }) }))
      .then(() => APIManager.getAllCategory("articles/?_expand=user").then(data => { this.setState({ articles: data }) }))
      .then(() => APIManager.getAllCategory("events/?_expand=user").then(data => { this.setState({ events: data }) }))
      .then(() => APIManager.getAllCategory("tasks/?_expand=user").then(data => { this.setState({ tasks: data }) }))
      .then(() => APIManager.getAllCategory("friends/?_expand=user").then(data => { this.setState({ friends: data }) }))
      .then(() => this.setState({ pageLoaded: true }))
  }

  render() {
    if (this.state.pageLoaded) {
      return (
        <React.Fragment>
          <NavBar user={this.state.currentUser} logout={this.logoutUser} />
          <ApplicationViews messages={this.state.messages} refresh={this.refreshData} activeUser={this.activeUser} />
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