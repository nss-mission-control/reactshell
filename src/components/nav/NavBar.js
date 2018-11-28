import React, { Component } from "react"
// import { Link } from "react-router-dom"
import "./navbar.css"

class NavBar extends Component {

  modifyFontColor(element) {
    element.classList.toggle("has-text-link");
    console.log(element)
  }

  resetFontColor(element) {
    element.classList.toggle("has-text-link");
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
              Tasks
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              Events
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              News
            </a>
            <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
              Friends
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
                Username here
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
                  Edit Profile
                </a>
                <a className="navbar-item has-text-white" onMouseOver={(e) => this.modifyFontColor(e.target)} onMouseOut={(e) => this.resetFontColor(e.target)}>
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