import React from "react";
import Register from "./components/register";
import Login from "./components/login";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  logoutUser() {
    this.setState({ isLoggedIn: false });
    this.props.handleLogout();
  }

  handleLogin(user) {
    this.setState({ isLoggedIn: true, user: user });
    this.props.handleUserLogin(user);
  }

  handleRegistration(user) {
    this.setState({ isLoggedIn: true, user: user });
    this.props.handleUserRegistration(user);
  }

  renderView() {
    if (this.state.isLoggedIn === true) {
      return (
        <span className="navBar">
          <h3>
            Hello, {this.state.user.name}
            <h3
              onClick={this.logoutUser}
              style={{ marginRight: 10, cursor: "pointer" }}
            >
              Logout
            </h3>
          </h3>
        </span>
      );
    } else
      return (
        <React.Fragment>
          <Login handleLogin={this.handleLogin} />{" "}
          <Register handleRegistration={this.handleRegistration} />
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
          <span
            onClick={this.renderView}
            style={{ marginRight: 10, cursor: "pointer" }}
            className="fas fa-file-prescription"
          />{" "}
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">{this.renderView()}</div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
