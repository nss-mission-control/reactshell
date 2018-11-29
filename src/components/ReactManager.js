import React, {Component} from 'react'
// import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';
import APIManager from "../modules/APIManager";

export default class ReactManager extends Component{
  state = {
    pageLoaded: false
  }

  componentDidMount = () => {
    this.refreshData();
}

refreshData = () => {
  let newState = {};
  APIManager.getAllCategory("messages/?_expand=user").then(data => {this.setState({messages: data})})
  .then(() => APIManager.getAllCategory("users").then(data => {this.setState({users: data})}))
  .then(() => APIManager.getAllCategory("articles/?_expand=user").then(data => {this.setState({articles: data})}))
  .then(() => APIManager.getAllCategory("events/?_expand=user").then(data => {this.setState({events: data})}))
  .then(() => APIManager.getAllCategory("tasks/?_expand=user").then(data => {this.setState({tasks: data})}))
  .then(() => APIManager.getAllCategory("friends/?_expand=user").then(data => {this.setState({friends: data})}))
  .then(() => this.setState({pageLoaded: true}))
}

  render() {
    if (this.state.pageLoaded) {
    return(
      <React.Fragment>
        {/* <NavBar /> */}
        <ApplicationViews messages={this.state.messages} refresh={this.refreshData}/>
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