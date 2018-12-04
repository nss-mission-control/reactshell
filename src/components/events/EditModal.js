import React, {Component} from 'react'
import APIManager from "../../modules/APIManager";

export default class EventsModal extends Component{
  state = {
    name: "",
    location: "",
    time: "",
    date: ""
  }

  componentDidMount=()=>{
    this.setState({
      name: this.props.event.name,
      location: this.props.event.location,
      time: this.props.event.time,
      date: this.props.event.date
    })
  }

  resetState = () => {
    this.setState({ name: "", location: "", time: "", date: ""})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      oldEvent: this.props.event
    });
  }

  saveEvent = () => {
    let userId = parseInt(sessionStorage.getItem("id"));
    let editEvent = {
      name: this.state.name,
      timestamp:`${this.state.date}T${this.state.time}:00.000`,
      location: this.state.location,
      userId: userId
    }
    if (editEvent.name === "") {
      editEvent.name = this.props.event.name;
    }
    if (editEvent.location === "") {
      editEvent.location = this.props.event.location;
    }
    if (editEvent.date === "") {
      editEvent.date = this.props.event.date;
    }
    if (editEvent.time === "") {
      editEvent.time = this.props.event.time;
    }
    APIManager.updateItem("events", this.props.event.id, editEvent)
    .then(() => {
      this.resetState()
      this.props.refresh()
      this.props.closeModal()
      this.props.refreshEvents()
    })
    }

  render(){
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head">
            <div className="modal-card-title">Edit Your Event</div>
          </div>
          <div className="modal-card-body">
            <div className="field">
              <label className="label">Event Name</label>
              <div className="control">
                <input id="name" type="text" defaultValue={this.props.event.name} onChange={this.handleChange} ></input>
              </div>

              <label className="label">Event Date</label>
              <div className="control">
                <input id="date" type="date" defaultValue={this.props.event.date} onChange={this.handleChange} ></input>
              </div>

              <label className="label">Event Location</label>
              <div className="control">
                <input id="location" type="text" defaultValue={this.props.event.location} onChange={this.handleChange}></input>
              </div>

              <label className="label">Event Time</label>
              <div className="control">
                <input id="time" type="time" defaultValue={this.props.event.time} onChange={this.handleChange}></input>
              </div>

            </div>
          </div>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.saveEvent}>Save Event</button>
          </footer>
          <button className="modal-close is-large" aria-label="close" onClick={()=> this.props.closeModal()}></button>
        </div>

      </div>
    )
  }
}