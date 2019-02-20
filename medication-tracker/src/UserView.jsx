import React from "react";

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <center>
        <div>User view determined by login: true, user: role.</div>
      </center>
    );
  }
}

export default UserView;
