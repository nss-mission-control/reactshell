import React, {Component} from 'react'
import EventsCalendar from './EventsCalendar'
import Events from './Events'
import EventsModal from './EventsModal'

export default class EventsContainer extends Component{
  //TODO: Add click event on events modal to save new event
  //TODO: Add functionality to edit event
  state={
    addEvent: false
  }

  addEventClick=()=>{
    this.setState({
      addEvent: true
    })
  }

  closeModal=()=>{
    this.setState({
      addEvent: false
    })
  }

  render(){
    let addEvent=""
    if(this.state.addEvent === true){
      addEvent = <EventsModal closeModal={this.closeModal}/>
    }
    return(
      <React.Fragment>
      <div className="container">
        <div className="columns">
          <div className="column has-background-primary">
            <EventsCalendar addEventClick={this.addEventClick}/>
          </div>
          <div className="column has-background-info">
            <Events events={this.props.events}/>
            This is another column
          </div>
        </div>
      </div>
      {addEvent}
      </React.Fragment>
    )
  }
}