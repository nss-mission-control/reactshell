import React, {Component} from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import APICall from '../modules/APIManager'

export default class ReactManager extends Component{
  state={
    messages: [],
    news: [],
  }
  componentDidMount= () =>{
    const newState = {}

    //API Call to get messages data and add to new state object
    // APICall.getAllCategory("messages/?_expand=user").then(data => newState.messages = data)
      //API Call to get articles ane add to new state object
      // .then(()=>
      APICall.getAllCategory("articles/?_expand=user").then(articles => newState.news = articles)
      //API Call to set state equal to new state object
      .then(()=> this.setState(newState))
  }
  render(){
    return(
      <React.Fragment>
        {/* <NavBar /> */}
        <ApplicationViews news={this.state.news}/>
      </React.Fragment>
    )
  }
}