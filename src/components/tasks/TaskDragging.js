import React, { Component } from 'react'
import Tasks from './Tasks'
import { DragDropContext } from 'react-beautiful-dnd'
import APIManager from '../../modules/APIManager'
import Column from './Column'

export default class TaskDragging extends Component {

state = {
  tasks: [],
  columns: [{
    name: "Upcoming",
    id: 1,
    columnTasks: [1, 2, 3]

  },
  {
    name: "InProgress",
    id: 2,
    columnTasks: [4, 5, 6]

  },
  {
    name: "Completed",
    id: 3,
    columnTasks: [7, 8, 9]
  }],


  column_order: {
    columnId: []
  }


}

componentDidMount = () => {
  APIManager.getAllCategory("columns").then(data => {
     this.setState({columns: data})
 }).then(() =>
APIManager.getAllCategory("column_order"))
    .then(data => {
      this.setState({column_order: data}, () => console.log("column-order", this.state.column_order.columnId))
    }).then(() => APIManager.getAllCategory("tasks/?_expand=userId"))
    .then(data => {
      this.setState({tasks: data}, () => console.log("react manager tasks", this.state.tasks))
    })
}

onDragEnd = result => {
  // TODO: reorder our column
};

taskBuilder = () => {
  return (
    <section className="container">
      <div className="columns is-variable is-3">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.column_order.columnId.map(columnId => {
            const column = this.state.columns[columnId-1];
            console.log("array of tasks", column.columnTasks)
            // debugger
            //this is based on an array not by id.  TODO: make it filter by id
            const task = column.columnTasks.map(taskId => { this.state.tasks.filter( oneTask => oneTask.id === taskId)
              // this.state.tasks[taskId]
            });

            return <Column key={column.id} column={task} />
          })
          // {this.props.tasks.map(singleTask => {
          //   return <Tasks task={singleTask} key={singleTask.id} />
          // })}
        }
        </DragDropContext>
      </div>
    </section>
  )
}

render() {
  return (
    <React.Fragment>
       {this.taskBuilder()}
       </React.Fragment>
      )
    }
}