import React, {Component} from 'react'
import bulmaCalendar from '../../../node_modules/'

export default class EventsCalendar extends Component{

  componentDidMount(){
    const calendars = bulmaCalendar.attach('[type="date"]')
  }

  render(){
    return(
      <input type="date"></input>
    )
  }
}