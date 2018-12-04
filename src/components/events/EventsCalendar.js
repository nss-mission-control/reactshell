import React, {Component} from 'react'
import bulmaCalendar from '../../../node_modules/bulma-calendar/dist/js/bulma-calendar.js'
import '../../../node_modules/bulma-calendar/dist/css/bulma-calendar.min.css'

export default class EventsCalendar extends Component{

  componentDidMount(){
    const calendars = bulmaCalendar.attach('[type="date"]')
    calendars.forEach(calendar => {
      calendar.on('date:selected', date => {
        this.props.addEventClick()
      })
    })
  }

  render(){
    return(
      <input type="date" data-display-mode="inline"></input>
    )
  }
}