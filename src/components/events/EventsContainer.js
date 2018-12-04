import React, {Component} from 'react'
import EventsCalendar from './EventsCalendar'
import Events from './Events'
import EventsModal from './EventsModal'
import EditModal from "./EditModal";
import APIManager from "../../modules/APIManager";
import moment from 'moment'

export default class EventsContainer extends Component{
  state={
    editEvent: false,
    addEvent: false,
    allEvents: false,
    dateEvents: false,
    events: [],
    filteredEvents: [],
    dateFilteredEvents: [],
    sortedEvents: []
  }
  componentDidMount=()=>{
    this.refreshEvents()
  }

  refreshEvents=()=>{
    APIManager.getAllCategory("events/?_expand=user").then((data)=> this.setState({
      events: data
    })).then(()=>{
      let updatedEvents = []
      let today = new moment().toJSON()
      let myEvents = this.state.events
      .filter(event => event.userId === this.props.currentUser.id)
      let previousEvents = myEvents.filter(event => event.timestamp < today)
      previousEvents.sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
      let upcomingEvents = myEvents.filter(event => event.timestamp > today)
      upcomingEvents.sort(function(a,b){
        return new Date(a.timestamp) - new Date(b.timestamp)
      })
      upcomingEvents.map(event => updatedEvents.push(event))
      previousEvents.map(event => updatedEvents.push(event))
      this.setState({
        filteredEvents: updatedEvents
      })
      if (this.state.events.length > 1) {
        let updatedEvents = []
        let today = new moment().toJSON()
        let previousEvents = this.state.events.filter(event => event.timestamp < today)
        previousEvents.sort(function(a,b){
          return new Date(b.timestamp) - new Date (a.timestamp)
        })
        let upcomingEvents = this.state.events.filter(event => event.timestamp > today)
        upcomingEvents.sort(function(a,b){
          return new Date(a.timestamp) - new Date (b.timestamp)
        })
        upcomingEvents.map(event => updatedEvents.push(event))
        previousEvents.map(event => updatedEvents.push(event))
        this.setState({sortedEvents: updatedEvents})
    }
    })
  }

  showAllEvents=()=>{
    this.setState({
      dateEvents: false,
      allEvents: true
    })
  }

  filterEventByDate=(date)=>{
    let datearr= `${date.start}`.split(" ")
    let months =[
      {name: "Jan", number: "1"},
      {name: "Feb", number: "2"},
      {name: "Mar", number: "3"},
      {name: "Apr", number: "4"},
      {name: "May", number: "5"},
      {name: "Jun", number: "6"},
      {name: "Jul", number: "7"},
      {name: "Aug", number: "8"},
      {name: "Sep", number: "9"},
      {name: "Oct", number: "10"},
      {name: "Nov", number: "11"},
      {name: "Dec", number: "12"}]

    let correctMonth = months.filter(month => month.name === datearr[1])
    datearr[1]= correctMonth[0].number
    datearr = [datearr[3], datearr[1], datearr[2]].join("-")
    if(this.state.allEvents === true){
      let myEvents = this.state.sortedEvents
      .filter(event => event.timestamp.substring(0,10) === datearr)
      this.setState({
        dateEvents: true,
        dateFilteredEvents: myEvents
      })
    } else if(this.state.allEvents === false){
      let myEvents = this.state.filteredEvents
      .filter(event => event.timestamp.substring(0, 10) === datearr)
      this.setState({
        dateEvents: true,
        dateFilteredEvents: myEvents
      })
    }
  }

  showMyEvents=()=>{
    this.setState({
      allEvents:false,
      dateEvents: false
    })
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
      editEvent: false,
      dateEvents: false
    })
  }

  addEditClick = (event) => {
    let updatedEvent = {
      id: event.id,
      location: event.location,
      name: event.name,
      date: moment(event.timestamp).format("YYYY-MM-DD"),
      time: moment(event.timestamp).format("kk:mm")
    }
    this.setState({ editEvent: true, addEvent: false, event: updatedEvent})
  }

  deleteEvent = (event) => {
    APIManager.deleteItem("events", event)
    .then(() => {
      this.props.refresh()
      this.refreshEvents()
      this.setState({
        dateEvents: false
      })
    })
  }


  render(){
    let addEvent = "";
    let editEvent = "";
    let displayEvents =""
    if(this.state.editEvent) {
      editEvent = <EditModal closeModal={this.closeModal} refresh={this.props.refresh} event={this.state.event} refreshEvents={this.refreshEvents}/>
    }
    if(this.state.addEvent){
      addEvent = <EventsModal closeModal={this.closeModal} date={this.state.dateSelected} refresh={this.props.refresh} refreshEvents={this.refreshEvents}/>
    }
    if(this.state.allEvents === true){
      displayEvents = <Events events={this.state.sortedEvents} clickEvent={this.addEditClick} delete={this.deleteEvent} currentUserId={this.props.currentUser.id} refreshEvents={this.refreshEvents}/>
    } else if(this.state.allEvents === false){
      displayEvents = <Events events={this.state.filteredEvents} clickEvent={this.addEditClick} delete={this.deleteEvent} currentUserId={this.props.currentUser.id} refreshEvents={this.refreshEvents}/>
    }
    if(this.state.dateEvents === true){
      displayEvents = <Events events={this.state.dateFilteredEvents} clickEvent={this.addEditClick} delete={this.deleteEvent} currentUserId={this.props.currentUser.id} refreshEvents={this.refreshEvents}/>
    }
    return(
      <React.Fragment>
      <div className="container">
        <div className="field is-grouped is-grouped-centered">
          <h2 className="is-size-4"><strong>Events</strong></h2>
          &nbsp;<button className="button is-link" onClick={()=> this.addEventClick()}>+</button>
        </div>
        <div className="columns">
          <div className="column">
            <EventsCalendar onSelect={this.saveDate} addEventClick={this.addEventClick} filterEventByDate={this.filterEventByDate} refreshEvents={this.refreshEvents}/>
          </div>
          <div className="column">
            <nav className="navbar is-primary has-text-white">
              <div className="navbar-brand">
                <div className="navbar-item" onClick={()=> this.showMyEvents()}><strong className="has-text-white">My Events</strong></div>
              </div>
              <div className="navbar-item" onClick={()=> this.showAllEvents()}><strong className="has-text-white">All Events</strong></div>
            </nav>
              {displayEvents}
          </div>
        </div>
      </div>
      {editEvent}
      {addEvent}
      </React.Fragment>
    )
  }
}