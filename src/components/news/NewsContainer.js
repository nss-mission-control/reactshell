/* eslint-disable no-unused-expressions */
import React, {Component} from 'react'
import News from './News'
import AddEditNews from './AddEditNews'
import APICall from '../../modules/APIManager'

export default class NewsContainer extends Component{
  //TODO: Need to find a way to capture userId
  state={
    addNews: false,
    editNews: false,
    articleName: "",
    url: "",
    articleImage: "",
    dateSaved: "",
    about: "",
    userId: "",
  }

  addNewsClick(){
    this.setState({
      addNews: true,
    })
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addNewArticle=(evt)=>{
    evt.preventDefault()
      this.setState({addNews: false})
      const article={
        articleName: this.state.articleName,
        url: this.state.url,
        articleImage: this.state.articleImage,
        dateSaved: new Date(),
        about: this.state.about,
        userId: 1
      }
      APICall.saveItem("articles", article)
  }

  // editArticle=(evt)=>{
  //   this.setState({editNews: false})
  //   console.log("You're trying to edit")
  // }

  // closeFunction(){
  //   if(this.state.addNews === true){
  //     this.setState({
  //       addNews: false,
  //     })
  //   } else if(this.state.editNews === true){
  //     this.setState({
  //       editNews: false,
  //     })
  //   }
  // }
  //TODO: Need to assign the button to call the news module function with a method on this class
  //TODO: Need to add a route to the application views section to edit each article and add a new article
  render(){
    let addNews=""
    if(this.state.addNews === true){
      addNews = <AddEditNews addNews={this.state.addNews} handleFieldChange ={this.handleFieldChange} addArticle={this.addNewArticle} editArticle={this.editArticle}/>
    }
    return(
      <React.Fragment>
      <section className="container">
        <div className="field is-grouped">
            <h2>News</h2>
            <button onClick={()=>{
              this.addNewsClick()
            }}>+</button>
        </div>
        <div className="columns is-multiline">
          <News news={this.props.news}/>
        </div>
      </section>
      {addNews}
      </React.Fragment>
      )
    }
  }