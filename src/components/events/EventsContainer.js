import React, {Component} from 'react'
import EventsCalendar from './EventsCalendar'
// import Events from './Events'

export default class EventsContainer extends Component{

  render(){
    return(
      <div className="container">
        <div className="columns">
          <div className="column has-background-primary">
            <EventsCalendar />
            This is a column
          </div>
          <div className="column has-background-info">
            {/* <Events /> */}
            This is another column
          </div>
        </div>
      </div>
    )
  }
}