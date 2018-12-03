import React, {Component} from 'react'

export default class NewsModule extends Component{

  addEditCapability=(id)=>{
    if(id === this.props.currentUserId){
      return <span className="icon level-item" onClick={()=> this.props.editNewsClick()}>
        <i className="fas fa-pencil-alt is-link"></i>
      </span>
    } else{
      return
    }
  }

  addDeleteCapability=(id)=>{
    if(id === this.props.currentUserId){
      return <span className="icon is-link level-item" onClick={()=> this.props.deleteNewsClick()}>
          <i className="fas fa-trash-alt"></i>
      </span>
    }
  }

  //Step 5: When news modal renders take information that is passed down and create pop-up with that information and button to read more
  //Call functions above in this component to add edit capability and delete capability for active users to modify their articles only

  render(){
    return(
      <React.Fragment>
      <div className="modal is-active" id="newsModal">
        <div className="modal-background"></div>
        <div className="modal-card has-background-white box">
          <article className="media">
            <figure className="media-left">
              <p className="image is-128x128">
                <img src={this.props.articleImage} alt="Article"/>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <strong>{this.props.articleName}</strong>
                <p>{this.props.about}</p>
              </div>
              <nav className="level">
                <div className="level-left">
                <span className="icon level-item">
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-book-open">
                      </i>
                    </a>
                </span>
              {this.addEditCapability(this.props.userId)}
              {this.addDeleteCapability(this.props.userId)}
              </div>
            </nav>
            </div>
          </article>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={()=> this.props.closeModal()}></button>
      </div>
    </React.Fragment>
    )
  }
}