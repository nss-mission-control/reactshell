import React, {Component} from 'react'

export default class EventsModal extends Component{
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
              <input type="text"></input>

              <label>Event Date</label>
              <input type="date"></input>

              <label>Event Location</label>
              <input type="text"></input>

              <label>Event Time</label>
              <input type="time"></input>

            </div>
          </div>
          <footer className="modal-card-foot">
            <button className="button">Save Event</button>
          </footer>
          <button className="modal-close is-large" aria-label="close" onClick={()=> this.props.closeModal()}></button>
        </div>

      </div>
    )
  }
}