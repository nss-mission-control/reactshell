import { Route } from "react-router-dom";
import React, { Component } from "react";
// import Messages from "./messages";
import TaskView from "./tasks/TaskView"


export default class ApplicationViews extends Component {
 render() {
     return (
       <React.Fragment>
         {/* <Route exact path="/messages" render={(props) => {
           return <Messages refreshData={this.props.refresh}/>
         }} /> */}
         <Route exact path="/tasks" render={(props) => {
           return <TaskView {...props} tasks={this.props.tasks} />
         }}/>
       </React.Fragment>
     )
 }


}