import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import renderHtml from 'react-render-html';
import './styles.scss';
const CustomFileUpload = (props) => {
  const fileValue = props.field.value && props.field.value.name ? props.field.value.name : false;
  return (
    <React.Fragment>
      <input
        name={props.field.name}
        type="file"
        className="custom-file-input"
        accept="image/*,.pdf,.doc"
        onChange={(event) => {
          let file = event.currentTarget.files[0];
          props.form.setFieldTouched(props.field.name);
          props.form.setFieldValue(props.field.name, event.currentTarget.files[0], false);
        }}
      />
      <label className="custom-file-label" for="validatedCustomFile">
        <div className="label-text">
          {fileValue && props.fileName ? props.fileName : fileValue && !props.fileName ? 'Uploaded' : 'Choose file...'}
        </div>
      </label>
    </React.Fragment>
  );
};
const FileUpload = (props) => {
  return (
    <div className={props.split ? 'row m-0 field-row-pb' : 'esop-file-label'}>
      <label for={props.labelFor} className={props.split && 'col-lg-5 p-0'}>
        {renderHtml(props.labelTitle)} {props.isMandatory ? <span className="text-mandatory">*</span> : ''}
      </label>
      <div className={props.split ? 'esop-file-group col-lg-5 pl-0' : 'esop-file-group'}>
        <Field name={props.labelName} fileName={props.fileName} component={CustomFileUpload} />
        {props.notes && (
          <div className={props.split ? 'esop-file-notes pl-0' : 'esop-file-notes'}>{renderHtml(props.notes)}</div>
        )}
        <div className="esop-error-text">
          <ErrorMessage name={props.labelName} />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
