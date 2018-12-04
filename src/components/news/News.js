import React, {Component} from 'react'
import './News.css'
import NewsModule from './NewsModule'
import AddEditNews from './AddEditNews'
import DeleteNews from './DeleteNews';
import moment from 'moment'

export default class News extends Component{

  createClass=(index)=>{
    if(index === 0 || index % 3 === 0){
      return "column is-full"
    } else{
      return "column is-half"
    }
  }

  activeUserClass=(id)=>{
    if(id === this.props.currentUserId){
      return "tag is-link"
    } else{
      return "tag"
    }

  }

  friendClassName=(id)=>{
    let classNameDetails =""
    this.props.filteredFriends.map(friend => {
      if(friend.userId === id){
        classNameDetails= "content is-italic"
      }
      return classNameDetails;
    })
    return classNameDetails;
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
      articleName={this.props.articleName} about={this.props.about} articleImage={this.props.articleImage} url={this.props.url} closeModal={this.props.closeModal} editNewsClick={this.props.editNewsClick} deleteArticle={this.props.deleteArticle} deleteNewsClick={this.props.deleteNewsClick} currentUserId={this.props.currentUserId} userId={this.props.userId}/>
    } else if(this.props.editNews === true){
      showNews= <AddEditNews
      handleFieldChange={this.props.handleFieldChange}
      editNews={this.props.editNews}closeModal={this.props.closeModal}
      addNews={this.props.addNews} editArticleChanges={this.props.editArticleChanges} addNewArticle={this.props.addNewArticle}
      articleName={this.props.articleName} about={this.props.about} articleImage={this.props.articleImage} url={this.props.url} articleId={this.props.articleId} warningMessage={this.props.warningMessage} warningMessageAbout={this.props.warningMessageAbout} warningMessageImg={this.props.warningMessageImg} warningMessageURL={this.props.warningMessageURL}/>
    } else if(this.props.deleteNews === true){
      showNews=<DeleteNews deleteArticle={this.props.deleteArticle} closeModal={this.props.closeModal}/>
    }

    return(
      <React.Fragment>
      {
        this.props.news.map((article, index)=>{
          return(
          <div className={this.createClass(index)}
          key={article.id} onClick={()=> this.props.showNewsClick(article.url, article.articleName, article.about, article.articleImage, article.id, article.userId)}>
            <div className="box">
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={article.user.profilePic} alt="" />
                  </p>
                </figure>
                  <div className="media-content">
                    <div className="content">
                      <p id="userInfo" className="">
                      <strong>{article.user.firstName} {article.user.lastName}</strong> <small className={this.activeUserClass(article.userId)}>@{article.user.username}</small> <small className={this.activeUserClass(article.userId)}>{moment(`${article.dateSaved}`).fromNow()}</small>
                      </p>
                      <p className="">{article.about}</p>
                    </div>

                  <article className="media">
                    <figure className="media-left">
                      <p className="image is-128x128">
                        <img src={article.articleImage} alt=""/>
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className=
                      {this.friendClassName(article.userId)}
                      >
                        <p>
                        <strong>{article.articleName}</strong>
                        </p>
                      </div>
                    </div>
                  </article>
                  </div>
                </article>
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