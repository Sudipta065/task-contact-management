import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
      name: "",
      email: "",
      phone: "",
      district: "",
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

    let { email, district, name, phone } = this.state;
    let accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGlwdGE4MDA2NUBnbWFpbC5jb20iLCJpYXQiOjE2MDAzMzA3MTksImV4cCI6MTYwMDMzNDMxOSwic3ViIjoiMSJ9.hJSFIB9t6jkJsqeLq4qrrmgUlgASJrAVTMqcbSE-pUo";
    axios
      .post(
        "http://localhost:8000/contacts",
        {
          name: name,
          district: district,
          phone: phone,
          email: email,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${[accessToken]}`,
          },
        }
      )

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <h3>Add Contact</h3>
        <form className="form" onSubmit={this.submitForm}>
          <div className="form-group">
            <label className="mr-5">Full Name</label>
            <input
              className="form-control"
              type="name"
              placeholder="Your Name"
              name="name"
              value={this.state.name}
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
            <label className="mr-5">District</label>
            <input
              className="form-control"
              type="text"
              placeholder="District"
              name="district"
              value={this.state.district}
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="mr-5">Phone Number</label>
            <input
              className="form-control"
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={this.state.phone}
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
        <div className="mt-5">{this.state.errorMessage}</div>
      </div>
    );
  }
}
