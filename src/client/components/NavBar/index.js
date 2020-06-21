import React from "react";
import "./styles.scss";
class NavBar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          company-2020
        </a>
      </nav>
    );
  }
}

export default NavBar;
