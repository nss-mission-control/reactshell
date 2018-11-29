import React, { Component } from "react"
import API from "../../modules/APIManager"
import { Link } from "react-router-dom"

// these objects are used for inline style below
const hiddenStyle = {
  display: "none"
}

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
          //TODO: if user logs in, show username in top right corner (navbar component)
          // API.getOneFromCategory("users", user.id).then()
          this.props.activeUser(user)
          // this.props.history.push("/")
        } else {
          this.toggleValidation(e)
          return "nothing"
        }
      }
    }))
  }

  // toggle display none on validation tag
  toggleValidation(e) {
    //TODO: form validation tag does not appear when submit fails to log in user
    const xBtn = document.getElementById("login-validation")
    e.preventDefault();
    console.log("yes")
    xBtn.style.display = xBtn.style.display === "none" ? "" : "none";
  }

  render() {
    return (
      <div className="hero is-fullheight" style={heroMargin}>
        <div className="hero-body">
          <div className="container has-text-centered" style={centerForm}>
            <div className="column is-4" style={removePadding}>
              <h3 className="title is-4 has-text-grey">Welcome to ReactShell</h3>
              <p className="subtitle has-text-grey">Please login</p>
              <div className="box">
                <div style={centerContenthorizontally}>
                  <figure className="image is-128x128">
                    <img src="images/white-react-logo.png" />
                  </figure>
                </div>
                <form onSubmit={this.handleLogin} className="has-text-centered">
                  <div className="field">
                    <label htmlFor="inputUsername">
                      Username
                    </label>
                    <div className="control has-icons-left">
                      <input onChange={this.handleFieldChange} type="text" className="input"
                        id="username"
                        required autoFocus />
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
                    <div className="buttons is-centered">
                      <button type="submit" className="button is-link">
                        Sign in
                      </button>
                    </div>
                  </div>
                  <span className="tag is-danger" id="login-validation" style={hiddenStyle}>Incorrect username or password<button className="delete" onClick={(e) => this.toggleValidation(e)}></button></span>
                </form>
              </div>
              <p className="has-text-grey">
              <Link to="/signup">Sign Up</Link> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    )
  }
}