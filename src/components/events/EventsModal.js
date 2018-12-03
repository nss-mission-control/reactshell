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
      let newEvent = {userId: userId, name: this.state.name, location: this.state.location, date: this.state.date, time: this.state.time}
      APIManager.saveItem("events", newEvent)
      .then(() => {
        this.resetState();
        this.props.closeModal();
        this.props.refresh();
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
              <label>Event Name</label>
              <input id="name" type="text" defaultValue={this.state.name} onChange={this.handleChange} placeholder="Enter the event name."></input>

              <label>Event Date</label>
              <input id="date" type="date" defaultValue={this.props.date} onChange={this.handleChange} ></input>

              <label>Event Location</label>
              <input id="location" type="text" defaultValue={this.state.location} onChange={this.handleChange} placeholder="Enter the event location."></input>

              <label>Event Time</label>
              <input id="time" type="time" defaultValue={this.state.time} onChange={this.handleChange}></input>

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