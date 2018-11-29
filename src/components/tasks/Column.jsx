
import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Tasks'



export default class Column extends Component {

  render() {
    return (
    <div id = "container">
      <h3 id = "title">{this.props.column.title}</h3>
      <Droppable droppableId={this.props.column.id}>
        <div id = "taskList">
          {this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
        </div>
      </Droppable>
    </div>)
  }
}