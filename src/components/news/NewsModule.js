import React, {Component} from 'react'
import AddEditNews from './AddEditNews'
import APIManager from '../../modules/APIManager';

export default class NewsModule extends Component{
//TODO: Get button working to open link in a separate tag
//TODO: Delete function
//TODO: Refresh function
  state={
    editNews: false,
    articleName: "",
    url: "",
    articleImage: "",
    about: "",
    userId: "",
  }

  editNewsClick(){
    this.setState({
      editNews: true,
      articleName: this.props.articleName,
      url: this.props.url,
      articleImage: this.props.articleImage,
      about: this.props.description,
    })
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  editArticle=(evt)=>{
    evt.preventDefault()
    this.setState({editNews: false})
    const article ={
      articleName: this.state.articleName,
      url: this.state.url,
      articleImage: this.state.articleImage,
      about: this.state.about,
      userId: 1,
    }
    // console.log("You're trying to edit", article)
    APIManager.updateItem("articles", this.props.id, article)
  }
  closeFunction=()=>{
    this.setState({
      editNews: false
    })
  }

  render(){
    let newsEditor =""

    if(this.state.editNews === true){
      newsEditor= <AddEditNews handleFieldChange={this.handleFieldChange} editArticle={this.editArticle} editNews={this.state.editNews} closeFunction={this.closeFunction} title={this.props.title} about={this.props.description} img={this.props.img} url={this.props.url}/>
    }
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
          <button className="button" onClick={()=>  this.editNewsClick()}>Edit Article</button>

      </footer>
          {newsEditor}
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=> {this.props.closeFunction()}}></button>
    </div>
    )
  }
}