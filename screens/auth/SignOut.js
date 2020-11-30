import React, { Component } from "react";
import * as auth from "../store/ducks/auth.duck";
import { connect } from "react-redux";
import Screens from "../navigation/Screens";

class SignOut extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAuthToken } = this.props;

    return hasAuthToken ? <Screens /> : <Screens />;
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(SignOut);
