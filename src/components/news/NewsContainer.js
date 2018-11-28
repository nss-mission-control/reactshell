/* eslint-disable no-unused-expressions */
import React, {Component} from 'react'
import News from './News'

export default class NewsContainer extends Component{
  //TODO: Need to assign the button to call the news module function with a method on this class
  //TODO: Need to add a route to the application views section to edit each article and add a new article
  render(){
    return(
      <React.Fragment>
      <section className="container">
        <div className="field is-grouped">
            <h2>News</h2>
            <button>+</button>
        </div>
        <div className="columns is-multiline">
          <News news={this.props.news}/>
        </div>
      </section>
      </React.Fragment>
      )
    }
  }