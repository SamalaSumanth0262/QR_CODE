import React from "react";
import "./styles.scss";
import { Formik } from "formik";
import TextInput from "../Formik/TextInput";
import * as Yup from "yup";
import { signIn } from "./client";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkSignIn } from "../../Actions/ActivityActions";
const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required")
});
class LoginPage extends React.Component {
  state = {
    initialValues: {
      email: "",
      password: ""
    }
  };

  handleSubmitForm(values, props) {
    var { email, password } = values;
    this.props.dispatch(checkSignIn({ email, password }));
  }

  componentDidUpdate(prevProps, currentProps) {
    if (prevProps.authenticated !== this.props.authenticated) {
      toast.success("Login Successfully");
      this.props.history.push("/dashboard");
    } else if (
      prevProps.loginTryCount !== this.props.loginTryCount &&
      !this.props.authenticated
    ) {
      toast.error("Incorrect Credentials");
    }
  }
  render() {
    let renderView = props => {
      return (
        <form onSubmit={props.handleSubmit}>
          <div class="signInContatiner" id="background">
            <div class="signInCard">
              <div class="signHeading mb-4">Signin to Company</div>
              <TextInput
                type="text"
                labelName="email"
                labelTitle="Email ID"
                isMandatory={false}
              />

              <TextInput
                type="password"
                labelName="password"
                labelTitle="Password"
                isMandatory={false}
              />
              <Button type="submit" text="Sign In" />
              <div className="signUp">
                <div className="">
                  <a href="/signup">Register Here</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    };
    return (
      <Formik
        initialValues={this.state.initialValues}
        render={renderView}
        validationSchema={loginSchema}
        onSubmit={(values, props) => {
          this.handleSubmitForm(values, props);
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.activity.authenticated,
    loginTryCount: state.activity.loginTryCount
  };
}

export default connect(mapStateToProps)(withRouter(LoginPage));
