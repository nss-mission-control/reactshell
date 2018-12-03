import React, { Component } from 'react';
import OldMessages from "./oldMessages";
import NewMessage from "./newMessage";

export default class Messages extends Component {


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <OldMessages messages={this.props.messages} refresh={this.props.refresh}/>
          <NewMessage  refresh={this.props.refresh} />
        </div>
      </React.Fragment>
    )
  }
}