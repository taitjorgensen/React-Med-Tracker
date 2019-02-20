import React from "react";
import Register from "./components/register";
import Login from "./components/login";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  renderView() {
    var user = { name: "Tait" };
    if (this.state.isLoggedIn)
      return (
        <div>
          <h1>Hello, {user.name}</h1>
        </div>
      );
    else
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
        style={{ backgroundColor: "PowderBlue" }}
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
