import React, {Component} from 'react'

export default class AddEditNews extends Component{

  buildHeader(addNews, editNews){
    if(addNews === true){
      return <span className="has-text-centered is-size-4">
      <strong>Add a New Article</strong>
      </span>
    } else if(editNews === true){
      return <span className="has-text-centered is-size-4">
      <strong>Edit your article</strong>
      </span>
    }
  }

  //AddNewArticle function lives in the NewsContainer component

  buildButton(addNews, editNews){
    if(addNews === true){
      return <button className="button" onClick={(evt)=>{this.props.addNewArticle(evt)}}>Add New Article</button>
    } else if(editNews === true){
      return <button className="button" onClick={(evt)=> {this.props.editArticleChanges(evt, this.props.articleId)}}
      >Save Edits</button>
    }
  }

  //Step 5: When AddEditNews Container is rendered, it displays a modal with a form that contains two possible views: add and edit
  //The edit view will auto-populate the fields with existing information when any of the fields change, the handle field change function (held in the NewsContainer component) is called to reset state
  //Handle field change function is held in the newsContainer component and keeps state up to date with changes in fields

  render(){
    return(
      <div className="modal is-active" id="newsModal">
        <div className="modal-background"></div>
        <div className="modal-card has-background-white box">
          <div className="has-text-centered">
            {this.buildHeader(this.props.addNews, this.props.editNews)}
          </div>
          <div className="field">
          <label className="label">Article Name</label>
          <div className="control">
            <input className="input" type="text" id="articleName" placeholder="News Title" defaultValue={this.props.articleName} onChange={this.props.handleFieldChange}></input>
            <div className="help is-danger">{this.props.warningMessage}</div>
          </div>
          <label className="label">Article Description</label>
          <div className="control">
            <input className="input" type="text" id="about"placeholder="Description" defaultValue={this.props.about} onChange={this.props.handleFieldChange}></input>
            <div className="help is-danger">{this.props.warningMessageAbout}</div>
          </div>
          <label className="label">URL</label>
          <div className="control">
            <input className="input" type="text" id="url" placeholder="URL" defaultValue={this.props.url} onChange={this.props.handleFieldChange}></input>
            <div className="help is-danger">{this.props.warningMessageURL}</div>
          </div>
          <label className="label">Image Link</label>
          <div className="control">
            <input className="input" type="text" id="articleImage" placeholder="Image Link" defaultValue={this.props.articleImage} onChange={this.props.handleFieldChange}></input>
            <div className="help is-danger">{this.props.warningMessageImg}</div>
          </div>
        </div>
        {this.buildButton(this.props.addNews, this.props.editNews)}
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=> this.props.closeModal()}></button>
    </div>
    )
  }
}