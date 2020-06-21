import React from 'react';
import './styles.scss';
class NavBar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://img.favpng.com/23/25/9/iron-man-stencil-star-lord-carving-pumpkin-png-favpng-2Mg7GjSyAENHRv7yiV7qEx04J.jpg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          Avengers Assemble
        </a>
      </nav>
    );
  }
}

export default NavBar;
