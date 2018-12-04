/* eslint-disable no-unused-expressions */
import React, {Component} from 'react'
import News from './News'
import AddEditNews from './AddEditNews'
import APICall from '../../modules/APIManager'
import $ from 'jquery'

export default class NewsContainer extends Component{
  //TODO: Need to add this as a column layout and work on changing the display based on if the article is from the user, friends or people they are not friends with
  state={
    showNews: false,
    addNews: false,
    editNews: false,
    deleteNews: false,
    currentUserId: "",
    articleName: "",
    url: "",
    articleImage: "",
    dateSaved: "",
    about: "",
    userId: "",
    news: [],
    articleId: [],
    filteredFriends: [],
    warningMessage: "",
    warningMessageAbout: "",
    warningMessageURL: "",
    warningMessageImg: ""
  }

  //Step 1: When the main container component mounts, do an API fetch, get all of the articles and pass them to state as news
  componentDidMount(){
    let myFriends = this.props.friends
    .filter(friend => friend.request_userId === this.props.currentUser.id)
    APICall.getAllCategory("articles/?_expand=user")
    .then((data)=> this.setState({
      filteredFriends: myFriends,
      currentUserId: this.props.currentUser.id,
      news: data
    }))
  }

  //Step 3: when the add news button is clicked, set the state of addNews to true and display the component declared below
  addNewsClick(){
    this.setState({
      addNews: true,
    })
  }

//When the edit news button is clicked, set state of edit news to true and show news to false (so you don't end up with nested modals) and display the AddEdit News component with the edit news view
  editNewsClick=()=>{
    this.setState({
      editNews:true,
      showNews: false,
    })
  }
// When the delete news button is clicked, set the state of delete news to true and show news to false (so you don't end up with nested modals) and display the deleteNews component
  deleteNewsClick=()=>{
    this.setState({
      deleteNews: true,
      showNews: false,
    })
  }

  //When a news article is selected, this function is called and passed the information about that specific article. It then sets showNews state to true to render the NewsModal component
  showNewsClick=(url, title, description, img, id, userId)=>{
    this.setState({
      showNews: true,
    })
    this.resetState(url, title, description, img, id, userId)
  }

  resetState=(url, title, description, img, id, userId)=>{
    this.setState({
      url: url,
      articleName: title,
      about: description,
      articleImage: img,
      articleId: id,
      userId: userId
    })
  }

  //On any of the modals select the X in the top right hand corner to close the modal and show all articles
  closeModal=()=>{
    this.setState({
      showNews: false,
      editNews: false,
      addNews: false,
      deleteNews: false,
      url: "",
      articleName: "",
      about: "",
      articleImage: "",
      warningMessage: "",
      warningMessageAbout: "",
      warningMessageImg: "",
      warningMessageURL: ""
    })
  }

  //Used for both the add and edit components held in addEditNews, this function changes state to match text field values

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //Called from Add/Edit News function, this resets state for addNews to false and creates the element to be passed into the post to the database. Then it re-fetches all news articles and updates the news state (causing a re-render of the news section)

  addNewArticle=(evt)=>{
    evt.preventDefault()
    this.setState({
      warningMessage: "",
      warningMessageAbout: "",
      warningMessageImg: "",
      warningMessageURL: "",
    })
    if(this.state.articleName === ""){
      $("#articleName").addClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessage: "Please add an Article Name"})
      return
    } else if(this.state.url === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").addClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessageURL: "Please enter an Article URL"})
      return
    } else if(this.state.about === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").addClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessageAbout: "Please add an Article Description"})
      return
    } else if(this.state.articleImage === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").addClass("is-danger")
      this.setState({warningMessageImg: "Please add an Image Link"})
      return
    } else{
      this.setState({addNews: false})
      const article={
        articleName: this.state.articleName,
        url: this.state.url,
        articleImage: this.state.articleImage,
        dateSaved: new Date(),
        about: this.state.about,
        userId: this.state.currentUserId
      }
      APICall.saveItem("articles", article)
      .then(()=> APICall.getAllCategory("articles/?_expand=user")
      .then(data => this.setState({
        news: data,
        articleName: "",
        articleImage: "",
        about: "",
        url: "",
      })))
    }
  }

  //Called from Add/Edit News component, this resets state for editNews to false and creates the element to be passed into the patch to the database. Then it re-fetches all news articles and updates the news state(causing a re-render of the news section)
  editArticleChanges=(evt, id)=>{
    evt.preventDefault()
    if(this.state.articleName === ""){
      $("#articleName").addClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessage: "Please add an Article Name"})
      return
    } else if(this.state.url === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").addClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessageURL: "Please enter an Article URL"})
      return
    } else if(this.state.about === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").addClass("is-danger")
      $("#articleImage").removeClass("is-danger")
      this.setState({warningMessageAbout: "Please add an Article Description"})
      return
    } else if(this.state.articleImage === ""){
      $("#articleName").removeClass("is-danger")
      $("#url").removeClass("is-danger")
      $("#about").removeClass("is-danger")
      $("#articleImage").addClass("is-danger")
      this.setState({warningMessageImg: "Please add an Image Link"})
      return
    } else{
    const article ={
      articleName: this.state.articleName,
      url: this.state.url,
      articleImage: this.state.articleImage,
      about: this.state.about,
      userId: this.state.currentUserId,
    }
    APICall.updateItem("articles", id, article).then(()=> APICall.getAllCategory("articles/?_expand=user")).then((data)=> this.setState({
      editNews: false,
      news: data,
      url: "",
      articleName: "",
      about: "",
      articleImage: "",
    }))

  }
}

  //Called from the Delete News component, this resets state for deleteNews to false and captures the id number needed for the delete in the database. Then it re-fetches all news articles and updates the news state(causing a re-render of the news section)
  deleteArticle=(evt)=>{
    evt.preventDefault()
    const articleId = this.state.articleId

    APICall.deleteItem("articles", articleId).then(()=> APICall.getAllCategory("articles/?_expand=user")).then((data)=> this.setState({
      deleteNews: false,
      news: data
    }))
  }

  //Step 2: when section renders, use the following logic:
  //set blank variable called addNews, when state of addNews is true, show the AddEditNews component with the addNews view options
    //change state of add news using addNewsClick function above
  //Render each of the news articles using the imported News component

  render(){
    let addNews=""
    if(this.state.addNews === true){
      addNews = <AddEditNews
      handleFieldChange={this.handleFieldChange}
      editNews={this.state.editNews}closeModal={this.closeModal}
      addNews={this.state.addNews} editArticleChanges={this.editArticleChanges} addNewArticle={this.addNewArticle}
      articleName={this.state.articleName} about={this.state.about} articleImage={this.state.articleImage} url={this.state.url} articleId={this.state.articleId} warningMessage={this.state.warningMessage} warningMessageAbout={this.state.warningMessageAbout} warningMessageImg={this.state.warningMessageImg} warningMessageURL={this.state.warningMessageURL}/>
    }
    return(
      <React.Fragment>
      <section className="container">
        <div className="field is-grouped is-grouped-centered">
            <h2 className="is-size-4"><strong>News &nbsp;</strong></h2>
            <button className="button is-link" onClick={()=>{
              this.addNewsClick()
            }}>+</button>
        </div>
        <div className="columns is-multiline">
          <News showNews={this.state.showNews} showNewsClick={this.showNewsClick}
          addNews={this.state.addNews} handleFieldChange={this.handleFieldChange}
          news={this.state.news} editNews={this.state.editNews} articleName={this.state.articleName} about={this.state.about} articleImage={this.state.articleImage} url={this.state.url} closeModal={this.closeModal} editNewsClick={this.editNewsClick} editArticleChanges={this.editArticleChanges} addNewArticle ={this.addNewArticle} articleId={this.state.articleId} deleteArticle={this.deleteArticle} deleteNewsClick={this.deleteNewsClick} deleteNews={this.state.deleteNews} warningMessage={this.state.warningMessage} warningMessageAbout={this.state.warningMessageAbout} warningMessageImg={this.state.warningMessageImg} warningMessageURL={this.state.warningMessageURL} currentUserId={this.state.currentUserId} userId={this.state.userId} friends={this.props.friends} filteredFriends={this.state.filteredFriends}/>
        </div>
      </section>
      {addNews}
      </React.Fragment>
      )
    }
  }