import React from "react";
import firebase from "firebase";

class PatientMedications extends React.Component {
  state = {
    route: "patientSchedule",
    medications: null,
    medicationsPopulated: false,
    patientMedications: []
  };
  constructor(props) {
    super(props);

    let database = firebase.database();
    var childData;
    database.ref("medications").once("value", snapshot => {
      var medicationOptions = [];
      let i = 0;
      snapshot.forEach(function(childSnapshot) {
        childData = {
          key: i,
          value: childSnapshot.val()
        };
        medicationOptions.push(childData);
        i++;
      });
      this.setState({ medications: medicationOptions });
      this.setState({ medicationsPopulated: true });
    });
  }

  sortMedications() {
    const patientMedications = this.state.patientMedications;
    let i = 0;
    this.state.medications.forEach(function(medication) {
      const childData = {
        key: i,
        value: medication.value.name,
        name: medication.value.name,
        dosage: medication.value.dosage,
        image: medication.value.image
      };
      patientMedications.push(childData);
      i++;
    });
    return patientMedications.map(medication => {
      return (
        <div key={medication.key}>
          {medication.name}
          {"  "}
          {medication.dosage}
        </div>
      );
    });
  }

  renderViewTable() {
    if (this.state.medicationsPopulated)
      return <div className="patientMedications">{this.sortMedications}</div>;
    else return <div>There are no medications selected.</div>;
  }

  render() {
    return (
      <div className="container">
        <div>{this.renderViewTable()}</div>
      </div>
    );
  }
}

export default PatientMedications;
