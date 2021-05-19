import React from "react";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import LoadingWrapper from "../components/LoadingWrapper";
import Row from "../components/Row";
import TextBox from "../components/TextBox";
import emailjs from "emailjs-com";
import axios from "axios";

type RegisterProps = {
  signinSuccess: (user: object) => void;
  signinError: (error: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  isAuthenticated: boolean;
} & RouteComponentProps;

type RegisterState = {
  email: string;
  password: string;
  name: string;
};

class Register extends React.Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    email: "",
    password: "",
    name: "",
  };

  register = async (e: any) => {
    try {
      e.preventDefault();
      console.log(e);
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      axios.post("http://localhost:5000/auth/register", user).then(
        (response) => (
          console.log(response.status === 201),
          // history.state("/login")
          emailjs
            .sendForm(
              "service_hya0l49",
              "template_v9f4ini",
              e.target,
              "user_Rw2lpT67YgUp7iFUhF6iE"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            )
        )
      );

      this.props.history.push("/login");
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    return (
      <LoadingWrapper>
        <Row>
          <Column
            size={4}
            classes={
              "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"
            }
          >
            <h2>Register</h2>
            <hr />

            <form onSubmit={this.register}>
              <div className="form-group my 4">
                <input
                  placeholder={"Name"}
                  type={"text"}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  name="name"
                  className={"border border-4 rounded-3 w-100"}
                />
              </div>
              <div className="form-group my-4">
                <input
                  placeholder={"Email"}
                  type={"email"}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  name="email"
                  className={"border border-4 rounded-3 w-100"}
                />
              </div>
              <div className="form-group my 4">
                {" "}
                <input
                  placeholder={"Password"}
                  type={"password"}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  className={"border border-4 rounded-3 w-100"}
                />
              </div>

              <button className={"btn btn-success w-100"}>REGISTER</button>
            </form>
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}

export default Register;
