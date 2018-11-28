import React, {Component} from 'react'
import TaskContainer from './TaskContainer'
import Tasks from './Tasks'


export default class TaskView extends Component {

  render() {
      console.log(this.props.tasks)
    return(
    <React.Fragment>
      {this.props.tasks.map(singleTask =>
        <Tasks key={singleTask.id} task={singleTask}/>

      )}
      {/* <TaskContainer />
      <TaskContainer />
      <TaskContainer /> */}
    </React.Fragment>
    )
  }
}