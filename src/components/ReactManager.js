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

  //TODO: get username and append username in top right corner of navbar
  // checks for a logged in user and returns their username if true
  activeUser = (user) => {
    this.setState({ currentUser: user })
    return this.state.currentUser
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
          <NavBar user={this.state.currentUser} />
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