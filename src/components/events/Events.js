import React, {Component} from 'react'

export default class Events extends Component{
  render(){
    let userId = parseInt(sessionStorage.getItem("id"))
    if (this.props.events.length > 1) {
      this.props.events.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
    return(
      <React.Fragment>
      {
        this.props.events.map(event => {
          if (event.userId === userId) {
          return <div className="notification" key={event.id} id={event.id}>
            <div>{event.name}</div>
            <div>{event.location}</div>
            <div>{event.date}</div>
            <div>{event.time}</div>
            <button value={event.id} onClick={() => this.props.clickEvent(event)}>Edit</button>
            <button value={event.id} onClick={() => this.props.delete(event.id)}>Delete</button>
          </div>
          }
        })
      }
    </React.Fragment>
    )
  }
}