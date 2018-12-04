import React, { Component, PureComponent } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './tasks.css'



const Container = styled.div``;
let moment = require('moment');

export default class Tasks extends PureComponent {
  editButtonClick() {
    let taskContents = ''
    //if a task's edit button has been clicked this will be false and an input field will appear on that task
    if (this.props.passedState.editButtonCheck !== this.props.task[0].id) {
      taskContents =
      <Draggable draggableId={`task-${this.props.task[0].id}`} index={this.props.index}>
        {provided =>
        <Container

          {...provided.draggableProps}
          highlight_line
          {...provided.dragHandleProps}
          end_highlight_line
          ref={provided.innerRef}
          className="level box">
            <p>{this.props.task[0].task}</p>
            <p>{moment(this.props.task[0].dueDate).format("MM/DD/YYYY")}</p>
            <img className = "editIcon" id = {`editButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.editButtonClick(evt)} src="images/edit.png" alt="edit"/>
            <img className = "editIcon" src="images/trash.png" id ={`deleteButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.deleteTask(evt)} alt="delete"/>
          </Container>}
        </Draggable>
      return taskContents
    } else {
      taskContents =
      <Draggable draggableId={`task-${this.props.task[0].id}`} index={this.props.index}>
        {provided =>
       <Container

        {...provided.draggableProps}
        highlight_line
        {...provided.dragHandleProps}
        end_highlight_line
        ref={provided.innerRef}
        className="level box has-background-primary">

          <input id = {`editField-${this.props.task[0].id}-${this.props.columnId}`} onChange= {(evt) => this.props.editFieldChange(evt)} value = {this.props.passedState.editedTaskValue}/>
          <input type = "date" id = {`editDateField-${this.props.task[0].id}-${this.props.columnId}`} value={this.props.passedState.editedDateValue} onChange = {(evt) => this.props.editDateChange(evt)}/>
          <button id ={`saveButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.editTaskSave(evt)}>Save</button>
        </Container>}
        </Draggable>
    }
    return taskContents
  }

  render() {
    let filterByUserId =""
    if(this.props.task[0].userId===Number(sessionStorage.getItem("id")))
      filterByUserId = this.editButtonClick()

    return (
      filterByUserId
      )
  }
}