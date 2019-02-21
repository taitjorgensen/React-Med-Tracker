import React from "react";
import Register from "./components/register";
import Login from "./components/login";
import firebase from "firebase";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.user = {
      name: "",
      role: ""
    };
  }

  renderView() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({ isLoggedIn: true });
      return (
        <div>
          <h1>Hello, {this.user.name}</h1>
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
