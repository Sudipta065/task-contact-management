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
export default class Login extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;

    this.state = {
      email: "",
      password: "",
      loggedIn,
      errorMessage: null,
      emailValid: false,
      errorMsg: {},
      users: [],
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

  getUser = (accessToken) => {
    axios
      .get("http://localhost:8000/contacts", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${[accessToken]}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  submitForm = (e) => {
    e.preventDefault();

    let { email, password } = this.state;

    axios
      .post(
        "http://localhost:8000/login",
        { email: email, password: password }
        /* {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }*/
      )
      .then((response) => {
        console.log(response.data.accessToken);
        this.getUser(response.data.accessToken);
        const Token = response.data.accessToken;
        /* {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }*/
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { users, Token } = this.state;
    return (
      <div className="container">
        <h3>Log In</h3>
        <form className="form" onSubmit={this.submitForm}>
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

        <div className="container">
          {users.map((user) => {
            return (
              <div key={user.id}>
                <span>{user.id}</span>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.district}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
