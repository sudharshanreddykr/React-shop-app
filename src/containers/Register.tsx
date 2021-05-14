import axios from "axios";
import React from "react";
import {  Redirect } from "react-router-dom";
import Column from "../components/Column";
import Row from "../components/Row";

type RegisterState = {
  email: any;
  name: any;
  password: any;
  conformpassword: any;
  redirect: boolean;
};
class Register extends React.Component {
  state: RegisterState = {
    email: "",
    name: "",
    password: "",
    conformpassword: "",
    redirect: false,
  };

  submit = (e: any) => {
    e.preventDefault();

    if (this.state.conformpassword === this.state.password) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      axios.post("http://localhost:5000/auth/register", user).then(
        (response) => console.log(response.status === 201)
        // history.state("/login")
      );
      this.setState({ redirect: true });
    }
  };

  redirecting = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  changeValue = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container register-form">
        {this.redirecting()}
        <Row>
          <Column
            size={8}
            classes={
              "offset-md-2 mt-2 shadow-lg p-5 rounded border border-4 border border-dark"
            }
          >
            <form onSubmit={this.submit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="name"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.changeValue}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeValue}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeValue}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Re-EnterPassword</label>
                <input
                  type="password"
                  className="form-control"
                  name="conformpassword"
                  value={this.state.conformpassword}
                  onChange={this.changeValue}
                />
                {this.state.conformpassword === this.state.password ? null : (
                  <p>Password is not Matchning</p>
                )}
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" required />
                <label className="form-check-label">
                  Accept All Term & Conditions
                </label>
              </div>
              <button type="submit" className="btn btn-success ">
                Register
              </button>
            </form>
          </Column>
        </Row>
      </div>
    );
  }
}

export default Register;
