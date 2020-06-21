import React, { useState } from 'react';
import "./styles.scss";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import renderHtml from "react-render-html";


const RadioBox = (props) => {
  const { labelFor, labelTitle, isMandatory, disabled, labelName, options } = props;
  const customRadioBox = (props) => {
    const { options } = props;
    let handleRadio = (e, props) => {
      var { checked, name } = e.currentTarget
      if (name === 'Yes') {
        props.setFieldValue(props.labelName, checked)
      } else {
        props.setFieldValue(props.labelName, !checked)
      }
    }

    return (
      options.map((option) => {
        return (
          <div className='inline mr-5'>
            <input type='radio' onChange={(e) => handleRadio(e, props)} name={option.labelTitle} {...props} /><label>{renderHtml(option.labelTitle)}</label>
          </div>
        )
      })
    )
  }


  return (
    <div>
      <label for={labelFor}>
        {renderHtml(labelTitle)}
        {isMandatory ? (<span className='text-mandatory'>&nbsp;*</span>) : ("")}
        <label className="inline">
          <Field
            disabled={disabled}
            type={"radio"}
            className=''
            name={labelName}
            validate={true}
            component={customRadioBox}
            {...props}
          />
        </label>
      </label>
      <div className='error-text'>
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  )
}

RadioBox.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.bool
  })),
  width: PropTypes.string.isRequired
}

export default RadioBox;