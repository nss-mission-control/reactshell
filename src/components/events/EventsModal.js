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
      [event.target.id]: event.target.value
    });
  }

  saveEvent = () => {
    let userId = parseInt(sessionStorage.getItem("id"));
    let canSave = true;
    if (this.state.name === "" || this.state.location === "" || this.state.date === "" || this.state.time === "") {
      canSave = false;
      return canSave;
    }
    if (canSave) {
      let newEvent = {
        userId: userId,
        name: this.state.name,
        location: this.state.location,
        timestamp: `${this.state.date}T${this.state.time}:00.000`
      }
      APIManager.saveItem("events", newEvent)
      .then(() => {
        this.resetState();
        this.props.closeModal();
        this.props.refresh();
        this.props.refreshEvents()
      })
    }
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
              <label className="label">Event Name</label>
              <div className="control">
                <input id="name" type="text" defaultValue={this.state.name} onChange={this.handleChange} placeholder="Enter the event name."></input>
              </div>

              <label className="label">Event Date</label>
              <div className="control">
                <input id="date" type="date" defaultValue={this.props.date} onChange={this.handleChange} ></input>
              </div>

              <label className="label">Event Location</label>
              <div className="control">
                <input id="location" type="text" defaultValue={this.state.location} onChange={this.handleChange} placeholder="Enter the event location."></input>
              </div>

              <label className="label">Event Time</label>
              <div className="control">
                <input id="time" type="time" defaultValue={this.state.time} onChange={this.handleChange}></input>
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