import React, {Component} from 'react'


export default class Tasks extends Component {

  render(){
    return (
      <p className="level box has-background-primary"> {this.props.task.task}</p>
    )
  }
}