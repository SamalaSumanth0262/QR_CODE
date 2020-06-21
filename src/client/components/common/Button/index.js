import React from "react";
import "./styles.scss";
const Button = props => {
  return (
    <button
      className="btn btn-primary btn-block"
      type={props.type ? props.type : "button"}
      {...props}
    >
      {props.text}
    </button>
  );
};

export default Button;
