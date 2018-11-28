import React, {Component} from 'react'


export default class Tasks extends Component {

  render(){
    return (
      <p>{this.props.task.task}</p>
    )
  }
}