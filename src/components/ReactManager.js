import React, {Component} from 'react'
// import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';
import APIManager from "../modules/APIManager";

export default class ReactManager extends Component{
 state = {
   messages: [],
   tasks: []
 }

 componentDidMount = () => {
  APIManager.getAllCategory("messages/?_expand=user").then(data => {
     this.setState({messages: data})
 }).then(() => APIManager.getAllCategory("tasks/?_expand=userId"))
    .then(data => {
      this.setState({tasks: data}, () => console.log("react manager tasks", this.state.tasks))
    })
}

 render(){
   return(
     <React.Fragment>
       {/* <NavBar /> */}
       <ApplicationViews messages={this.state.messages} tasks={this.state.tasks}/>
     </React.Fragment>
   )
 }
}