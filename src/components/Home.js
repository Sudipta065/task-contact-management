import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg error">{props.message}</div>;
  }
  return null;
}
export default class Signup extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;

    this.state = {
      fulllName: "",
      email: "",
      password: "",
      loggedIn,
      errorMessage: null,
      emailValid: false,
      errorMsg: {},
    };
  }

  submitForm = (e) => {
    e.preventDefault();

    let { email, password, fullName } = this.state;
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:8000/contacts"

        /* {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }*/
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return <div className="container"></div>;
  }
}
