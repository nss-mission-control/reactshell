
import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Tasks'
import styled from 'styled-components'
import APIManager from '../../modules/APIManager'


const Container = styled.div``;
const Title = styled.h3``;
const TaskList = styled.div``;
const TodoBody = styled.div`
  padding: 20px
  border-radius: 4%`;

export default class Column extends Component {

  // newTask() {
  //   APIManager.saveItem("tasks", {
  //     task: "Test new app",
  //     userId: 1
  //   }).then(data =>{

  //     console.log(this.props.passedState)
  //     let columnTasks = this.props.passedState.columns.columnTasks
  //     columnTasks.shift(data.id)
  //     APIManager.updateItem("columns", 1, {columnTasks}).then(()=>{this.props.refreshCol()})
  //   }
  //   )}

  addButtonFilter() {
    if (this.props.column.id===1){
      return(<Container id = "container" className="column ">
      <div >
        <div className = "level">
      <Title id = "title" className="title level-left">{this.props.column.name}</Title>
        <button className = "" onClick = {()=> this.props.newButtonClick()}>+</button>
      </div>
      <TodoBody className = "has-background-grey-lighter">
      <Droppable droppableId={`col-${this.props.column.id}`}>
      {
        provided => (
          // if ref doesn't work try innerRef
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {this.props.tasks.map((task, index) =>
              <Task key={task[0].id} task={task} index={index} />

            )}
            {provided.placeholder}
          </TaskList>
        )
      }
      </Droppable>
      </TodoBody>
      </div>
    </Container>)
    } else {  return (
      <Container id = "container" className="column ">
        <div >
        <Title id = "title" className="title">{this.props.column.name}</Title>
        <TodoBody className = "has-background-grey-lighter">
        <Droppable droppableId={`col-${this.props.column.id}`}>
        {
          provided => (
            // if ref doesn't work try innerRef
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {
                this.props.tasks.map((task, index) =>{
                return <Task key={task[0].id} task={task} index={index} />}

              )}
              {provided.placeholder}
            </TaskList>
          )
        }
        </Droppable>
        </TodoBody>
        </div>
      </Container>) }
  }



  render() {
   return this.addButtonFilter()
  }
}