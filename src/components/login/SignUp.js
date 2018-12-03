// Code written by Brendan

import React, { Component } from "react"
import { Link } from "react-router-dom"
import APIManager from "../../modules/APIManager";

// these objects are used for inline styles below
const heroMargin = {
  marginTop: "-57px",
}

const centerForm = {
  display: "flex",
  justifyContent: "center",
  marginTop: "25px"
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
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    profilePic: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // validates username is unique and provided passwords match (email type and required attributes are in render())
  createNewUser(e) {
    e.preventDefault()
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirmPassword")
    const usernameInput = document.getElementById("username")
    usernameInput.style.color = "black"
    passwordInput.style.color = "black"
    confirmPasswordInput.style.color = "black"

    // ---- if user doesn't specify profile image link, give them the temp avatar image instead
    let profilePictureLink = "images/avatar-placeholder.png"
    let user = {}

    if (this.state.profilePic === "") {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        profilePic: profilePictureLink
      }
    } else {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        profilePic: this.state.profilePic
      }
    }

    // ---- verify username is unique and password/confirm password match
    let usernameTaken = false;

    APIManager.getAllCategory("users").then(users => {
      users.forEach(person => {
        // if username already exists, set variable to true
        if (user.username === person.username) {
          usernameTaken = true
        }
      })
      return usernameTaken
    })
      .then(result => {
        // if username exists, change text color of username to red
        if (result) {
          usernameInput.style.color = "red"
          return
          // check for no password match
        } else if (user.password !== this.state.confirmPassword) {
          passwordInput.style.color = "red"
          confirmPasswordInput.style.color = "red"
          return
        } else {
          APIManager.saveItem("users", user).then((user) => {
            sessionStorage.setItem("id", user.id)
            this.props.login()
            this.props.activeUser(user)
          })
        }
      })
  }

  render() {
    return (
      <div className="hero is-fullheight" style={heroMargin}>
        <div className="hero-body">
          <div className="container has-text-centered" style={centerForm}>
            <div className="column is-4" style={removePadding}>
              <h3 className="title is-4 has-text-grey">We're Glad You're Here!</h3>
              <div className="box">
                <div style={centerContenthorizontally}>
                  <figure className="image is-128x128">
                    <img src="images/white-react-logo.png" alt=""/>
                  </figure>
                </div>
                <form onSubmit={(e) => this.createNewUser(e)} className="has-text-centered">
                  <div className="field">
                    <label htmlFor="inputFirstName">
                      First name
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
                      Last name
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="lastName"
                        required />
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
                        required />
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
                      <input onChange={this.handleFieldChange} type="text" pattern=".{7,}" className="input" title="Username must be at least 7 characters in length"
                        id="username"
                        required />
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
                      <input onChange={this.handleFieldChange} type="password" className="input" title="Passwords must match"
                        id="password"
                        required />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="confirmPassword">
                      Confirm password
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="password" className="input" title="Passwords must match"
                        id="confirmPassword"
                        required />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="profilePic">
                      Provide a link for your profile picture
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="profilePic" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-link"></i>
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