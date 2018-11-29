
import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Tasks'
import styled from 'styled-components'

const Container = styled.div``;
const Title = styled.h3``;
const TaskList = styled.div``;

export default class Column extends Component {

  render() {
    return (
    <Container id = "container">
      <Title id = "title">{this.props.column.title}</Title>
      <Droppable droppableId={this.props.column.id}>
      {
        provided => (
          // if ref doesn't work try innerRef
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {this.props.tasks.map((task, index) =>

              <Task key={task.id} task={task} index={index} />
            )}
            {provided.placeholder}
          </TaskList>
        )
      }
      </Droppable>
    </Container>)
  }
}