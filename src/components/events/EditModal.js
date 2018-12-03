import React, {Component} from 'react'
import APIManager from "../../modules/APIManager";

export default class EventsModal extends Component{
  state = {
    name: "",
    location: "",
    time: "",
    date: ""
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
      date: this.state.date,
      location: this.state.location,
      time: this.state.time,
      userId: userId
    }
    if (editEvent.name === "") {
      editEvent.name = this.state.oldEvent.name;
    }
    if (editEvent.location === "") {
      editEvent.location = this.state.oldEvent.location;
    }
    if (editEvent.date === "") {
      editEvent.date = this.state.oldEvent.date;
    }
    if (editEvent.time === "") {
      editEvent.time = this.state.oldEvent.time;
    }
    APIManager.updateItem("events", this.state.oldEvent.id, editEvent)
    .then(() => {
      this.resetState();
      this.props.closeModal();
      this.props.refresh();
    })
    }

  render(){
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head">
            <div className="modal-card-title">Add New Events</div>
          </div>
          <div className="modal-card-body">
            <div className="field">
              <label>Event Name</label>
              <input id="name" type="text" defaultValue={this.props.event.name} onChange={this.handleChange} ></input>

              <label>Event Name</label>
              <input id="date" type="date" defaultValue={this.props.event.date} onChange={this.handleChange} ></input>

              <label>Event Location</label>
              <input id="location" type="text" defaultValue={this.props.event.location} onChange={this.handleChange}></input>

              <label>Event Time</label>
              <input id="time" type="time" defaultValue={this.props.event.time} onChange={this.handleChange}></input>

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