import React, {Component} from 'react'

export default class DeleteNews extends Component{

render(){
  return(
    <div className="modal is-active" id="deleteNewsModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          Are you sure you want to delete this article?
        </header>
        <div className="modal-content">
          <button className="button" onClick={(evt)=> this.props.deleteArticle(evt)}>Yes</button>
          <button className="button" onClick={(evt)=> this.props.closeModal()}>No</button>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=> this.props.closeModal()}></button>

    </div>
  )
}
}