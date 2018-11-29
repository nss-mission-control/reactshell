import React, {Component} from 'react'

export default class AddEditNews extends Component{

  buildHeader(addNews, editNews){
    if(addNews === true){
      return "Add a New Article"
    } else if(editNews === true){
      return "Edit your article"
    }
  }

  buildButton(addNews, editNews){
    if(addNews === true){
      return <button className="button" onClick={(evt)=>{this.props.addArticle(evt)}}>Add New Article</button>
    } else if(editNews === true){
      return <button className="button" onClick={(evt)=> {this.props.editArticle(evt)}}
      >Save Edits</button>
    }
  }

  //In the render, we will need: Header, News Title, Synopsis, URL, Image URL
  //Submit button: If edit, need to call a put on the existing object in the database
  // If save new, need to call a post on to create a new object and update state.


  render(){
    return(
      <div className="modal is-active" id="newsModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">{this.buildHeader(this.props.addNews, this.props.editNews)}
        </header>
        <div className="modal-content">
          <input className="input" type="text" id="articleName" placeholder="News Title" defaultValue={this.props.title} onChange={this.props.handleFieldChange}></input>
          <input className="input" type="text" id="about"placeholder="Synopsis" defaultValue={this.props.about} onChange={this.props.handleFieldChange}></input>
          <input className="input" type="text" id="url" placeholder="URL" defaultValue={this.props.url} onChange={this.props.handleFieldChange}></input>
          <input className="input" type="text" id="articleImage" placeholder="Image URL" defaultValue={this.props.img} onChange={this.props.handleFieldChange}></input>
      </div>
      <footer className="modal-card-foot">
        {this.buildButton(this.props.addNews, this.props.editNews)}
      </footer>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=> {this.props.closeFunction()}}></button>
    </div>
    )
  }
}