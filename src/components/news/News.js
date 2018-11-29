import React, {Component} from 'react'
import './News.css'
import NewsModule from './NewsModule'
import AddEditNews from './AddEditNews'

export default class News extends Component{

  createClass=(index)=>{
    if(index === 0 || index % 3 === 0){
      return "column is-full"
    } else{
      return "column is-half"
    }
  }

  //Step 4: When section renders, using the following logic:
  // If showNews props passed down from NewsContainer component are true, display the NewsModule component that captures the direct information for that article and passes it down as props
  //If editNews props passed down from NewsContainer component are true, display AddEditNews component with edit news view
  //Map over each of the news articles passed down and return the display object for each one, the size of each article is determined through the CreateClass function above in this component
  //Show news click function lives in news container component above

  render(){
    let showNews = ""
    if(this.props.showNews === true){
      showNews= <NewsModule
      articleName={this.props.articleName} about={this.props.about} articleImage={this.props.articleImage} url={this.props.url} closeModal={this.props.closeModal} editNewsClick={this.props.editNewsClick}/>
    } else if(this.props.editNews === true){
      showNews= <AddEditNews
      handleFieldChange={this.props.handleFieldChange}
      editNews={this.props.editNews}closeModal={this.props.closeModal}
      addNews={this.props.addNews} editArticleChanges={this.props.editArticleChanges} addNewArticle={this.props.addNewArticle}
      articleName={this.props.articleName} about={this.props.about} articleImage={this.props.articleImage} url={this.props.url} articleId={this.props.articleId}/>
    }
    return(
      <React.Fragment>
      {
        this.props.news.map((article, index)=>{
          return(
          <div className={this.createClass(index)} key={article.id} onClick={()=> this.props.showNewsClick(article.url, article.articleName, article.about, article.articleImage, article.id)}>
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