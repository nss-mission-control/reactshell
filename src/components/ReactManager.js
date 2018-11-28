import React, { Component } from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';
import APIcall from "../modules/APIManager";

export default class ReactManager extends Component {
  // state = {
  //   messages: []
  // }

  // componentDidMount = () => {
  //   APIcall.getAllCategory("messages/?_expand=user").then(data => {
  //     this.setState({ messages: data })
  //   })
  // }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/* <ApplicationViews messages={this.state.messages} /> */}
      </React.Fragment>
    )
  }
}