import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./navbar.css"
import $ from "jquery"
import APIManager from "../../modules/APIManager";

class NavBar extends Component {


  state = {
    username: ""
  }

  componentDidMount() {
    let userId = sessionStorage.getItem("id")
    APIManager.getOneFromCategory("users", userId).then(user => this.setState({ username: user.username }))
  }

  modifyFontColor(element) {
    element.classList.toggle("has-text-link");
  }

  resetFontColor(element) {
    element.classList.toggle("has-text-link");
  }

  handleDropDownColor(element) {
    if ($(element).parent().hasClass("navbar-dropdown")) {
      $(element).parent().prev().toggleClass("has-text-link")
    }
  }

  render() {

    if (sessionStorage.getItem("id") !== null) {
      return (
        <nav className="navbar has-background-link" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src="images/white-react-logo.png" width="28" height="28" />
            </a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="reactShellNav">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="reactShellNav" className="navbar-menu">
            <div className="navbar-start">
              <Link className=" navbar-item has-text-white" to="/" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>Messages</Link>

              <Link className="navbar-item has-text-white" to="/tasks" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>Tasks</Link>

              <Link className="navbar-item has-text-white" to="/events" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>Events</Link>

              <Link className="navbar-item has-text-white" to="/news" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>News</Link>

              <Link className="navbar-item has-text-white" to="/friends" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>Friends</Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link has-text-white" id="dropdown-top">
                  {this.state.username}
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item has-text-white" id="dropdown-itm1" onMouseOver={(e) => this.handleDropDownColor(e.target)} onMouseOut={(e) => this.handleDropDownColor(e.target)}>
                    Edit Profile
                  </a>
                  <a className="navbar-item has-text-white" id="dropdown-itm2" onMouseOver={(e) => this.handleDropDownColor(e.target)} onMouseOut={(e) => this.handleDropDownColor(e.target)} onClick={this.props.logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav >
      )
    } else {
      return (
        <nav className="navbar has-background-link" role="navigation" aria-label="main navigation"></nav >
      )
    }
  }
}

export default NavBar