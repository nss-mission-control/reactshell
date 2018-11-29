import React, { Component } from "react"
import API from "../../modules/APIManager"
// import { Link } from "react-router-dom"
import "./navbar.css"
import $ from "jquery"

class NavBar extends Component {

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

  //TODO: get username and append username in top right corner of navbar
  // checks for a logged in user and returns their username if true
  activeUser() {
    let userId = sessionStorage.getItem("id")
    if (userId !== null) {
      return API.getOneFromCategory("Users", userId)
    } else {
      return "Please Log In"
    }
  }

  render() {

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
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              {/* <Link className="nav-link" to="/">Messages</Link> */}
              Messages
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              {/* <Link className="nav-link" to="/tasks">Tasks</Link> */}
              Tasks
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              {/* <Link className="nav-link" to="/events">Events</Link> */}
              Events
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              {/* <Link className="nav-link" to="/news">News</Link> */}
              News
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              {/* <Link className="nav-link" to="/friends">Friends</Link> */}
              Friends
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link has-text-white" id="dropdown-top">
                Username here
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item has-text-white" id="dropdown-itm1" onMouseOver={(e) => this.handleDropDownColor(e.target)} onMouseOut={(e) => this.handleDropDownColor(e.target)}>
                  Edit Profile
                </a>
                <a className="navbar-item has-text-white" id="dropdown-itm2" onMouseOver={(e) => this.handleDropDownColor(e.target)} onMouseOut={(e) => this.handleDropDownColor(e.target)}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>

      </nav >
    )
  }
}

export default NavBar