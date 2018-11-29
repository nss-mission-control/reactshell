import React, {Component} from 'react'
import './News.css'
// import $ from "jquery"
import NewsModule from './NewsModule'

export default class News extends Component{
  //TODO: Need to add this as a column layout and work on changing the display based on if the article is from the user, friends or people they are not friends with
  state={
    showNews: false,
    url: [],
    title: [],
    description: [],
    img: [],
    id: ""
  }
  clickFunction=(url, title, description, img, id)=>{
    this.setState({
      showNews: true,
      editNews: false,
      url: url,
      title: title,
      description: description,
      img: img,
      id: id,
    })
  }
  closeFunction=()=>{
    this.setState({
      showNews: false,
      url: [],
      title: [],
      description: [],
      img: [],
    })
  }
  createClass=(index)=>{
    if(index === 0 || index % 3 === 0){
      return "column is-full"
    } else{
      return "column is-half"
    }
  }

  render(){
    let showNews = ""
    if(this.state.showNews === true){
      showNews= <NewsModule url={this.state.url} title={this.state.title} closeFunction={this.closeFunction} description={this.state.description} img={this.state.img} editNewsClick={this.editNewsClick} handleFieldChange={this.handleFieldChange} editArticle={this.editArticle} id={this.state.id}/>
    }
    return(
      <React.Fragment>
      {
        this.props.news.map((article, index)=>{
          return(
          <div className={this.createClass(index)} key={article.id} onClick={()=> this.clickFunction(article.url, article.articleName, article.about, article.articleImage, article.id)}>
            <div className="has-background-primary">
              <div className="media">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="media-left">
                  <img src={article.articleImage} alt="Article" />
                </a>
                <div className="media-content">
                  <h2>{article.articleName}</h2>
                  <h4>Saved by: {article.user.firstName} | Date Saved: ${article.dateSaved}</h4>
                  <p>{article.about}</p>
                </div>
              </div>
            </div>
          </div>
          )
        })
      }
      {showNews}
    </React.Fragment>
    )
  }
}