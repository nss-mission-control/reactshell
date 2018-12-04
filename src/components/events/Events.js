import React, {Component} from 'react'
import moment from 'moment'
import "./Events.css"

export default class Events extends Component{

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
  createClass=(num,event, index)=>{
    let today = new moment().toJSON()
    if(num === 1){
      if(event.timestamp  > today){
        return "has-text-centered has-text-primary"
      } else if(event.timestamp < today){
        return "has-text-centered has-text-gray-light"
      }
    } else if(num === 2){
      if(event.timestamp > today){
        return "is-size-3 has-text-centered has-text-primary"
      } else if(event.timestamp < today){
        return "is-size-3 has-text-centered has-text-gray-light"
      }
    } else if(num === 3){
      if(index === 0){
        return "next-event"
      } else{
        return
      }
    }
  }

  render(){
    let userId = parseInt(sessionStorage.getItem("id"))
    return(
      <React.Fragment>
      {
        this.props.events.map((event, index) => {
          return <div className="box" key={event.id} id={this.createClass(3, event, index)}>
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
                    <p className="has-text-centered">
                    <strong className={this.createClass(1,event)}>
                    {moment(`${event.timestamp}`).format("MMMM")} </strong>
                    <br />
                    <strong className={this.createClass(2, event)}>{moment(`${event.timestamp}`).format("D")}</strong>
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p className="is-size-4"><strong>{event.name}</strong></p>
                      <p>{event.location}</p>
                      <p>{moment(`${event.timestamp}`).format("hh:mm A")}</p>
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