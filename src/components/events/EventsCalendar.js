import React, {Component} from 'react'
import bulmaCalendar from '../../../node_modules/bulma-calendar/dist/js/bulma-calendar.js'
import '../../../node_modules/bulma-calendar/dist/css/bulma-calendar.min.css'
import "./Events.css"

export default class EventsCalendar extends Component{

  componentDidMount(){
    const calendars = bulmaCalendar.attach('[type="date"]', {
      dateFormat: 'DD/MM/YYYY',
    })
    calendars.forEach(calendar => {
      calendar.on('date:selected', date => {
        this.props.filterEventByDate(date)
      })
    })
  }

  render(){
    return(
      <input type="date" data-display-mode="inline" startDate-dateFormat="MM/DD/YYYY"></input>
    )
  }
}