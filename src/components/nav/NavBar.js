import React, { Component } from "react"
// import { Link } from "react-router-dom"
import "./navbar.css"

class NavBar extends Component {

  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="reactShellNav">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="reactShellNav" class="navbar-menu">

          <div class="navbar-start">
            <a class="navbar-item">
              {/* <Link className="nav-link" to="/">Messages</Link> */}
              Messages
            </a>
            <a class="navbar-item">
              Tasks
            </a>
            <a class="navbar-item">
              Events
            </a>
            <a class="navbar-item">
              News
            </a>
            <a class="navbar-item">
              Friends
            </a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Username here
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Edit Profile
                </a>
                <a class="navbar-item">
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