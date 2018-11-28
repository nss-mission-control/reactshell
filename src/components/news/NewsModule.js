import React, {Component} from 'react'

export default class NewsModule extends Component{
//TODO: Get button working to open link in a separate tag

  render(){
    return(
      <div className="modal is-active" id="newsModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">{this.props.title}
        </header>
        <div className="modal-content">
          <img src={this.props.img} alt="Article"/>
          <p>{this.props.description}</p>
      </div>
      <footer className="modal-card-foot">
          <a className="button" src={this.props.url}>Read More</a>

      </footer>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=> {this.props.closeFunction()}}></button>
    </div>
    )
  }
}