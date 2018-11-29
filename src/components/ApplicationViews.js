import { Route } from "react-router-dom";
import React, { Component } from "react";
// import Messages from "./messages";
// import TaskContainer from "./tasks/TaskContainer"
import TaskDragging from "./tasks/TaskDragging"



export default class ApplicationViews extends Component {
 render() {
   console.log("app view pros", this.props)
     return (
       <React.Fragment>
         {/* <Route exact path="/messages" render={(props) => {
           return <Messages refreshData={this.props.refresh}/>
         }} /> */}
         <Route exact path="/tasks" render={(props) => {
           return <TaskDragging  {...props} tasks={this.props.tasks} />
         }}/>
       </React.Fragment>
     )
 }


}