import {Route} from 'react-router-dom'
import React, {Component} from 'react'
import NewsContainer from './news/NewsContainer'
// import Messages from './messages/Messages'


export default class ApplicationViews extends Component{

  render(){
    return(
      <React.Fragment>
        {/* <Route exact path="/" render={(props)=> {
          return <Messages refreshData={this.props.refresh} />
        }} /> */}
        <Route exact path="/news" render={(props) => {
          return <NewsContainer {...props} news={this.props.news} />
        }} />
      </React.Fragment>
    )
  }
}