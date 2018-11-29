import React, { Component } from "react"
import API from "../../modules/APIManager"
import { Link } from "react-router-dom"

// these objects are used for inline styles below
const heroMargin = {
  marginTop: "-57px",
}

const centerForm = {
  display: "flex",
  justifyContent: "center"
}

// helps extend width of form on mobile
const removePadding = {
  padding: 0
}

const centerContenthorizontally = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "5px"
}

export default class Login extends Component {

  // Set initial state
  state = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  createNewUser() {

  }

  render() {
    return (
      <div className="hero is-fullheight" style={heroMargin}>
        <div className="hero-body">
          <div className="container has-text-centered" style={centerForm}>
            <div className="column is-4" style={removePadding}>
              <h3 className="title is-4 has-text-grey">We're Glad You're Here!</h3>
              <p className="subtitle has-text-grey">Sign Up Below</p>
              <div className="box">
                <div style={centerContenthorizontally}>
                  <figure className="image is-128x128">
                    <img src="images/white-react-logo.png" />
                  </figure>
                </div>
                <form onSubmit={this.createNewUser} className="has-text-centered">
                  <div className="field">
                    <label htmlFor="inputFirstName">
                      First Name
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="firstName"
                        required autoFocus />
                      <span className="icon is-small is-left">
                        <i className="fas fa-keyboard"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="inputLastName">
                      Last Name
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="lastName"
                        required  />
                      <span className="icon is-small is-left">
                        <i className="fas fa-keyboard"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="email">
                      Email
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="email" className="input"
                        id="email"
                        required  />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="inputUsername">
                      Username
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="username"
                        required  />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="inputPassword">
                      Password
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="password" className="input"
                        id="password"
                        required />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="password" className="input"
                        id="confirmPassword"
                        required />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="buttons is-centered">
                      <button type="submit" className="button is-link">
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <p className="has-text-grey">
                Already a User? <Link to="/"> Login Instead</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    )
  }
}