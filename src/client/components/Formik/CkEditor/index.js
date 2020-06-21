import React from 'react';
import './styles.scss'
import PropTypes from "prop-types";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Field, ErrorMessage } from "formik";
import renderHtml from "react-render-html";


const customEditor = (props) => {
  return (
    <React.Fragment>
      <CKEditor
        editor={ClassicEditor}
        data={props.field.value} //init set data here.
        onChange={(event, editor) => {
          const data = editor.getData();
          props.form.setFieldTouched(props.field.name)
          props.form.setFieldValue(props.field.name, data)
        }}
        {...props}
      />
    </React.Fragment>
  )
}

const CkEditor = (props) => {
  return (
    <div>
      <div>
        {renderHtml(props.labelTitle)}
        {props.isMandatory ? (
          <span className='text-mandatory'>&nbsp;*</span>
        ) : (
            ""
          )}
        <br />
        <Field name={props.labelName} component={customEditor} validate={props.validate} disabled={props.disabled} {...props} />
      </div>
      <div className='error-text'>
        <ErrorMessage name={props.labelName} />
      </div>
    </div >
  );
};

CkEditor.propTypes = {
  labelName: PropTypes.string.isRequired
}

export default CkEditor