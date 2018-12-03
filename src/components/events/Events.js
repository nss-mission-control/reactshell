import React, {Component} from 'react'

export default class Events extends Component{
  render(){

    return(
      <React.Fragment>
      {
        this.props.events.map(event =>{
          return <div className="notification" key={event.id} id={event.id}>
            <div>{event.name}</div>
            <div>{event.location}</div>
            <div>{event.date}</div>
            <div>{event.time}</div>
            <button value={event.id} onClick={() => this.props.clickEvent(event)}>Edit</button>
            <button value={event.id} onClick={() => this.props.delete(event.id)}>Delete</button>
          </div>
        })
      }
    </React.Fragment>
    )
  }
}