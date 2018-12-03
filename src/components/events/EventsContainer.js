import React, {Component} from 'react'
import EventsCalendar from './EventsCalendar'
import Events from './Events'
import EventsModal from './EventsModal'
import EditModal from "./EditModal";
import APIManager from "../../modules/APIManager";

export default class EventsContainer extends Component{
  //TODO: Add click event on events modal to save new event
  //TODO: Add functionality to edit event
  state={
    addEvent: false
  }

  addEventClick=(event)=>{
    this.setState({
      addEvent: true,
      editEvent: false
    })
  }

  closeModal=()=>{
    this.setState({
      addEvent: false,
      editEvent: false
    })
  }

  addEditClick = (event) => {
    this.setState({ editEvent: true, addEvent: false, event: event})
  }

  deleteEvent = (event) => {
    APIManager.deleteItem("events", event)
    .then(() => this.props.refresh())
  }


  render(){
    let addEvent = "";
    let editEvent = "";
    if(this.state.editEvent) {
      editEvent = <EditModal closeModal={this.closeModal} refresh={this.props.refresh} event={this.state.event}/>
    }
    if(this.state.addEvent){
      addEvent = <EventsModal closeModal={this.closeModal} date={this.state.dateSelected} refresh={this.props.refresh}/>
    }
    return(
      <React.Fragment>
      <div className="container">
        <div className="columns">
          <div className="column has-background-primary">
            <EventsCalendar onSelect={this.saveDate} addEventClick={this.addEventClick}/>
          </div>
          <div className="column has-background-info">
            <Events events={this.props.events} clickEvent={this.addEditClick} delete={this.deleteEvent}/>
            This is another column
          </div>
        </div>
      </div>
      {editEvent}
      {addEvent}
      </React.Fragment>
    )
  }
}