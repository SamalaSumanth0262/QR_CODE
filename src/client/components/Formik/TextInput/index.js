import React from "react";
import "./styles.scss";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import renderHtml from "react-render-html";

const TextInput = props => {
  return (
    <div style={{ width: "100%" }} {...props}>
      <label className={props.align ? props.align : null} for={props.labelFor}>
        {renderHtml(props.labelTitle)}
        {props.isMandatory ? (
          <span className="text-mandatory">&nbsp;*</span>
        ) : (
          ""
        )}
        <Field
          disabled={props.disabled}
          type={props.type ? props.type : "text"}
          name={props.labelName}
          validate={props.validate}
          {...props}
        />
      </label>
      <div className="error-text">
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired
};

export default TextInput;
