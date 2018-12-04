import React, {Component} from 'react'
import moment from 'moment'

export default class Events extends Component{
  //TODO: update date formatting
  addEditCapability=(event)=>{
    if(event.user.id === this.props.currentUserId){
      return <span className="icon level-item" onClick={()=> this.props.clickEvent(event)}>
        <i className="fas fa-pencil-alt is-link"></i>
      </span>
    }
  }
  addDeleteCapability=(event)=>{
    if(event.user.id === this.props.currentUserId){
      return <span className="icon is-link level-item" onClick={()=> this.props.delete(event.id)}>
        <i className="fas fa-trash-alt"></i>
      </span>
    }
  }

  reformatDate=()=>{

  }

  render(){
    let userId = parseInt(sessionStorage.getItem("id"))
    if (this.props.events.length > 1) {
      this.props.events.sort(function (a, b) {
        // return (b.event.id) - (a.event.id)
        console.log("b.date", new Date(b.date), "a.date", new Date(a.date))
        return new Date(b.date) - new Date(a.date);
      });
    }
    return(
      <React.Fragment>
      {
        this.props.events.map(event => {
          return <div className="box" key={event.id} id={event.id}>
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={event.user.profilePic} alt="" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                <p id="userInfo" className="">
                <strong>{event.user.firstName} {event.user.lastName}</strong> <small className="tag">@ {event.user.username}</small>
                </p>
              </div>
                <article className="media">
                  <figure className="media-left">
                    <p className="has-text-centered has-text-primary">
                    <strong>{moment(`${event.timestamp}`).format("MMMM")} </strong>
                    <br />
                    <strong className="is-size-3">{moment(`${event.timestamp}`).format("D")}</strong>
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p className="is-size-4"><strong>{event.name}</strong></p>
                      <p>{event.location}</p>
                      <p>{moment(`${event.time}`).format("HH mm A")}</p>
                    </div>
                  </div>
                </article>
              </div>
            </article>
            <div className="level">
              <div className="level-left">
                {this.addEditCapability(event)}
                {this.addDeleteCapability(event)}
            </div>
          </div>
          </div>
          }
      )
      }
    </React.Fragment>
    )
  }
}