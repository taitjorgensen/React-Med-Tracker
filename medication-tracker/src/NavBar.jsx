import React from "react";
import Register from "./components/register";
import Login from "./components/login";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    };

    this.user = props.user;
  }

  logoutUser() {
    //logout of Firebase
  }

  renderView() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <h1>Hello, {this.user.name}</h1>
          <h2
            onClick={this.logoutUser}
            style={{ marginRight: 20, cursor: "pointer" }}
          >
            Logout
          </h2>
        </div>
      );
    } else
      return (
        <React.Fragment>
          <Login /> <Register />
        </React.Fragment>
      );
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "PowderBlue"
        }}
      >
        <div className="navbar-brand">
          My
          <span className="fas fa-file-prescription" />{" "}
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">{this.renderView()}</div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
