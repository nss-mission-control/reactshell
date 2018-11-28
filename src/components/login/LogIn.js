import React, { Component } from "react"

export default class Login extends Component {

  // Set initial state
  state = {
    email: "",
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

    sessionStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    )
  }

  render() {
    return (
      <form onSubmit={this.handleLogin} className="field">
        <h1 className="h3 mb-3 list font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail">
          Email address
                </label>
        <input onChange={this.handleFieldChange} type="email"
          id="email"
          placeholder="Email address"
          required="" autoFocus="" />
        <label htmlFor="inputPassword">
          Password
                </label>
        <input onChange={this.handleFieldChange} type="password"
          id="password"
          placeholder="Password"
          required="" />
        <button type="submit">
          Sign in
                </button>
      </form>
    )
  }
}