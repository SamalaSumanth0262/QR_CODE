import React from "react";
import TextInput from "../Formik/TextInput";
import Button from "../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "./client";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
const RegisterSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  name: Yup.string().required("Name is required")
});

class Register extends React.Component {
  state = {
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      password: ""
    }
  };

  async handleSubmitForm(values, props) {
    var result = await registerUser(values);
    toast.success("Successfully Registered, Now You can login");
    this.props.history.push(`/signin`);
  }

  render() {
    let renderView = props => {
      console.log("render -> props", props);
      return (
        <form onSubmit={props.handleSubmit}>
          <div class="signInContatiner" id="background">
            <div class="signInCard">
              <div class="signHeading mb-4">Register to Company</div>
              <TextInput
                type="text"
                labelName="name"
                labelTitle="Full Name"
                isMandatory={true}
              />
              <TextInput
                type="text"
                labelName="email"
                labelTitle="Email ID"
                isMandatory={true}
              />
              <TextInput
                type="text"
                labelName="phone_number"
                labelTitle="Phone Number"
                isMandatory={true}
              />

              <TextInput
                type="text"
                labelName="password"
                labelTitle="Password"
                isMandatory={true}
              />
              <Button text="REGISTER" type="submit" />
              <div className="signUp">
                <div className="">
                  <a href="/signin">Signin Here</a>
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
        validationSchema={RegisterSchema}
        onSubmit={(values, props) => {
          this.handleSubmitForm(values, props);
        }}
      />
    );
  }
}

export default withRouter(Register);
