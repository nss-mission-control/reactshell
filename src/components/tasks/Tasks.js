import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'


const Container = styled.div``;

export default class Tasks extends Component {

  render() {
    console.log("draggable id", this.props.task)
    return (
      <Draggable draggableId={this.props.task[0].id} index={this.props.index}>
        {provided => <Container {...provided.draggableProps}
          highlight_line {...provided.dragHandleProps} end_highlight_line
          ref={provided.innerRef} className="level box has-background-primary"> {this.props.task[0].task}</Container>}
      </Draggable>
    )
  }
}