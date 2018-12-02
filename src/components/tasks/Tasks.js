import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'


const Container = styled.div``;


export default class Tasks extends Component {
  editButtonClick() {
    let taskContents = ''
    //if a task's edit button has been clicked this will be faluse and an input field will appear on that task
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
          className="level box has-background-primary">
            {this.props.task[0].task}
            <img className = "editIcon" id = {`editButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.editButtonClick(evt)} src="images/edit.png" alt="edit"/>
            <button id ={`deleteButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.deleteTask(evt)}>Delete</button>
          </Container>}
        </Draggable>

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
          <button id ={`saveButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.editTaskSave(evt)}>Save</button>
        </Container>}
        </Draggable>
    }
    return taskContents
  }

  render() {
    return (
      this.editButtonClick()
      // <Draggable draggableId={`task-${this.props.task[0].id}`} index={this.props.index}>
      //   {provided =>

      //    <Container

      //     {...provided.draggableProps}
      //     highlight_line
      //     {...provided.dragHandleProps}
      //     end_highlight_line
      //     ref={provided.innerRef}
      //     className="level box has-background-primary">
      //       {this.props.task[0].task}
      //       <button id = {`EditButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.editTaskSave(evt)}>Edit</button>
      //       <button id ={`deleteButton-${this.props.task[0].id}-${this.props.columnId}`} onClick= {(evt) => this.props.deleteTask(evt)}>Delete</button>
      //     </Container>}

      // </Draggable>
    )
  }
}