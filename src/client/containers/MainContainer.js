/* eslint-disable no-console */
import React, { Component } from "react";
import Router from "../routes";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

// Add a request interceptor
axios.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    // Do something with request error
    toast.error("Something Went Wrong");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // handleGlobalError(error);
    toast.error(error.message);
    return Promise.reject(error);
  }
);
class MainContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Router />
        <Footer />
      </React.Fragment>
    );
  }
}

export default MainContainer;
