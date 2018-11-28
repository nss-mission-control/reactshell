import React, { Component } from "react"
import API from "../../modules/APIManager"

export default class Login extends Component {

  // Set initial state
  state = {
    username: "",
    password: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Simplistic handler for login submit
  handleLogin = (e) => {
    e.preventDefault()

    API.getAllCategory("users").then(users => users.forEach(user => {
      if (this.state.username === user.username) {
        if (user.password = this.state.password) {
          sessionStorage.setItem("id", user.id)
          this.props.history.push("/")
        }
      }
    }))

  }

  render() {
    return (
      <form onSubmit={this.handleLogin} className="field container">
        <h1 className="title is-5">Please sign in</h1>
        <label htmlFor="inputUsername">
          Username
        </label>
        <div className="control">
          <input onChange={this.handleFieldChange} type="text" className="input"
            id="username"
            placeholder="enter username"
            required autoFocus="" />
        </div>
        <label htmlFor="inputPassword">
          Password
        </label>
        <div className="control">
          <input onChange={this.handleFieldChange} type="password" className="input"
            id="password"
            placeholder=" enter password"
            required />
        </div>
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
    )
  }
}