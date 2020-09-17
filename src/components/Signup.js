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

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = "Invalid email format";
    }

    //

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    let { email, password, fullName } = this.state;

    axios
      .post(
        "http://localhost:8000/register",
        { email: email, password: password, fullName: fullName }
        /* {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }*/
      )
      .then((response) => {
        console.log(response);

        if (response.data.success === true) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ errorMessage: response.data.message });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <h3>Sign Up In</h3>
        <form className="form" onSubmit={this.submitForm}>
          <div className="form-group">
            <label className="mr-5">Full Name</label>
            <input
              className="form-control"
              type="name"
              placeholder="Your Name"
              name="name"
              value={this.state.fullName}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </div>

          <div className="form-group">
            <label className="mr-5">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={(e) => {
                this.onChange(e);
                this.updateEmail(e.target.value);
              }}
            />
            <ValidationMessage
              valid={this.state.emailValid}
              message={this.state.errorMsg.email}
            />
          </div>
          <br />
          <div className="form-group">
            <label className="mr-5">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Log In" />
        </form>
        <div className="mt-5">{this.state.errorMessage}</div>
      </div>
    );
  }
}
