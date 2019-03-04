import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Patient from "./PatientView";
import HealthcareProvider from "./HealthcareProviderView";
import CareTaker from "./CareTakerView";

//  process.env.REACT_APP_firebaseConfig
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      alert: false
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserRegistration = this.handleUserRegistration.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBf2y0yPgb4NuvS_hSC1xFfRhwGgOlDmJo",
      authDomain: "myrx-app.firebaseapp.com",
      databaseURL: "https://myrx-app.firebaseio.com",
      projectId: "myrx-app",
      storageBucket: "myrx-app.appspot.com",
      messagingSenderId: "521882278554"
    };
    firebase.initializeApp(config);
  }

  handleUserLogin(user) {
    this.setState({ isLoggedIn: true, user: user });
  }

  handleUserRegistration(user) {
    this.setState({ isLoggedIn: true, user: user });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  sendAlert = alert => {
    this.setState({ alert: alert });
    firebase
      .database()
      .ref("alert")
      .set({ alert: true, patient: this.state.user.name });
    console.log(alert);
  };

  renderView = () => {
    var user = this.state.user;
    if (this.state.isLoggedIn === false) return <Welcome />;
    else if (user.role === "patient")
      return <Patient user={this.state.user} sendAlert={this.sendAlert} />;
    else if (user.role === "healthcareProvider")
      return <HealthcareProvider user={this.state.user} />;
    else if (user.role === "careTaker")
      return <CareTaker user={this.state.user} />;
    else return <Welcome />;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          handleUserLogin={this.handleUserLogin}
          handleUserRegistration={this.handleUserRegistration}
          handleLogout={this.handleLogout}
        />
        <br />
        <main className="container">{this.renderView()}</main>
      </React.Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
