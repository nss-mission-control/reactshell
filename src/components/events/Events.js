import React, {Component} from 'react'

export default class Events extends Component{
  render(){
    return(
      <React.Fragment>
      {
        this.props.events.map(event =>{
          return <div className="notification"key={event.id}>
            <div>{event.name}</div>
            <div>{event.location}</div>
            <div>{event.date}</div>
            <div>{event.time}</div>
          </div>
        })
      }
    </React.Fragment>
    )
  }
}