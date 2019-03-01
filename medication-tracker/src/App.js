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
      user: null
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

  // componentWillUpdate() {
  //   this.verifyUser();
  // }

  // verifyUser = () => {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) this.setState({ isLoggedIn: true, user: user });
  //     else this.setState({ user: null });
  //   });
  // };

  // verifyLogin() {
  //   var ui = new firebase.auth.AuthUI(firebase.auth());
  //   var uiConfig = {
  //     callbacks: {
  //       signInSuccessWithAuthResult: function() {
  //         this.setState({ isLoggedIn: true });
  //       },
  //       uiShown: function() {
  //         document.getElementById("loader").style.diplay = "none";
  //       }
  //     },
  //     signInFlow: "popup",
  //     signInSuccessUrl: "localhost:3000",
  //     signInOptions: [
  //       {
  //         provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //         requireDisplayName: false
  //       }
  //     ]
  //   };
  //   ui.start("#firebase-auth-container", uiConfig);
  // }
  handleUserLogin(user) {
    this.setState({ isLoggedIn: true, user: user });
  }

  handleUserRegistration(user) {
    this.setState({ isLoggedIn: true, user: user });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  renderView = () => {
    var user = this.state.user;
    console.log(user);
    if (this.state.isLoggedIn === false) return <Welcome />;
    else if (user.role === "patient") return <Patient user={this.state.user} />;
    else if (user.role === "healthcareProvider")
      return <HealthcareProvider user={this.state.user} />;
    else if (user.role === "careTaker")
      return <CareTaker user={this.state.user} />;
    else return <Welcome />;
  };

  render() {
    // this.verifyUser();
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
