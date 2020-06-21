import React from 'react';
import "./styles.scss";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import renderHtml from "react-render-html";
const CheckBox = (props) => {
  const { labelTitle, labelFor } = props
  return (
    <div>
      <label for={labelFor}>
        {renderHtml(labelTitle)}
        {props.isMandatory ? (<span className='text-mandatory'>&nbsp;*</span>) : ("")}
        <Field
          disabled={props.disabled}
          type={"checkbox"}
          className={props.className}
          name={props.labelName}
          validate={props.validate}
          {...props}
        />
      </label>
      <div className='error-text'>
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  )
}

CheckBox.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool
}

export default CheckBox;


