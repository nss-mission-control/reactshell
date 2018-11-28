import { Route } from "react-router-dom";
import React, { Component } from "react";
import Messages from "./messages";


export default class ApplicationViews extends Component {

  render() {
      return (
        <React.Fragment>
          <Route exact path="/" render={(props) => {
            return <Messages messages={this.props.messages}/>
          }} />
        </React.Fragment>
      )
  }


}