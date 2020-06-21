import React from "react";
import "./styles.scss";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import renderHtml from 'react-render-html';
const CustomTextArea = props => {
  return (
    <textarea
      className=''
      style={{ borderRadius: "4px", borderColor: "rgb(204,204,204)" }}
      value={props.field.value}
      rows={3}
      cols={10}
      {...props.field}
      maxLength={props.size}
      {...props}
    />
  );
};

const TextArea = props => {
  return (
    <div style={{ width: "100%" }}>
      <label>
        {props.labelTitle}
        {props.isMandatory ? (
          <span className='text-mandatory'>&nbsp;*</span>
        ) : (
            ""
          )}
        <br />
        <Field
          name={props.labelName}
          component={CustomTextArea}
          validate={props.validate}
          disabled={props.disabled}
          type={props.type ? props.type : "text"}
          {...props} />
      </label>
      <div className='error-text'>
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  );
};
TextArea.propTypes = {
  labelName: PropTypes.string.isRequired
};

export default TextArea;
