import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import FormikExample from "../client/components/Formik/FormikExample";
import DashBoard from "../client/components/DashBoard";
const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={LoginPage} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/formik" component={FormikExample} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route
          exact
          path="*"
          component={() => {
            return <div>404 Page</div>;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
