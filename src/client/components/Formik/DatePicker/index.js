import React from 'react';
import { Field, ErrorMessage } from "formik";
import renderHtml from 'react-render-html';

const DatePicker = (props) => {
  return (
    <div>
      <label htmlFor={props.labelFor} className='mt-4'>
        {renderHtml(props.labelTitle)}
        {props.isMandatory ? <span className="text-mandatory">*</span> : ''}
        <Field
          name={props.labelName}
          validate={props.validate}
          type='date'
          {...props} />
      </label>
      <div>
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  )
}

export default DatePicker