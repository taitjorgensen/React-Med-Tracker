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
      user: {}
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

  verifyUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) this.setState({ isLoggedIn: true, user: user });
      else this.setState({ user: null });
    });
  };

  renderView = () => {
    var user = this.state.user;
    if (this.state.isLoggedIn === false) return <Welcome />;
    else if (user.role === "patient") return <Patient user={this.state.user} />;
    else if (user.role === "healthcareProvider")
      return <HealthcareProvider user={this.state.user} />;
    else if (user.role === "careTaker")
      return <CareTaker user={this.state.user} />;
    else return <Welcome />;
  };

  render() {
    this.verifyUser();
    return (
      <React.Fragment>
        <NavBar user={this.state.user} isLoggedIn={this.state.isLoggedin} />
        <br />
        <main className="container">{this.renderView()}</main>
      </React.Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
