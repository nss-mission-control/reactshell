import { Route } from "react-router-dom";
import React, { Component } from "react";
import Messages from "./messages";
import Friends from "./friends/Friends.js"


export default class ApplicationViews extends Component {

  render() {
      return (
        <React.Fragment>
          <Route exact path="/messages" render={(props) => {
            return <Messages messages={this.props.data.messages} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/" render={(props) => {
            return <Friends data={this.props.data} refresh={this.props.refresh}/>
          }} />
        </React.Fragment>
      )
  }


}