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
      isLoggedIn: true,
      username: ""
    };
    this.user = {
      role: "patient"
    };
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

  verifyUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) this.setState((this.isLoggedIn = true));
      this.getUserInfo();
    });
  }

  getUserInfo() {
    var username = firebase.database().ref("users/" + this.user.username);
    this.setState((this.username = username));
  }

  renderView() {
    this.verifyUser();
    if (this.state.isLoggedIn === false) return <Welcome />;
    else if (this.user.role === "patient") return <Patient />;
    else if (this.user.role === "healthcareProvider")
      return <HealthcareProvider />;
    else if (this.user.role === "careTaker") return <CareTaker />;
    else return <Welcome />;
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <br />
        <main className="container">{this.renderView()}</main>
      </React.Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
